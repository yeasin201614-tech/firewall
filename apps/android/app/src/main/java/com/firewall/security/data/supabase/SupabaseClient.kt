package com.firewall.security.data.supabase

import android.os.Build
import android.util.Log
import com.firewall.security.data.model.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.URL
import javax.net.ssl.HttpsURLConnection

object SupabaseConfig {
    const val BASE_URL = "https://xmtzgthbjhxymvbzskxt.supabase.co"
    const val ANON_KEY = "sb_publishable_yxdNGamsymHgYe1c5RgBpw_iCKqy79D"
}

class SupabaseClient {

    private val tag = "SupabaseClient"
    var authToken: String? = null
    var currentUserId: String? = null

    private fun openConnection(endpoint: String, method: String = "GET"): HttpsURLConnection {
        val fullUrl = if (endpoint.startsWith("http")) endpoint else "${SupabaseConfig.BASE_URL}$endpoint"
        val connection = URL(fullUrl).openConnection() as HttpsURLConnection
        connection.requestMethod = method
        connection.setRequestProperty("apikey", SupabaseConfig.ANON_KEY)
        val token = authToken ?: SupabaseConfig.ANON_KEY
        connection.setRequestProperty("Authorization", "Bearer $token")
        connection.setRequestProperty("Content-Type", "application/json")
        connection.setRequestProperty("Prefer", "return=representation")
        connection.connectTimeout = 10000
        connection.readTimeout = 10000
        return connection
    }

    suspend fun login(email: String, password: String):Result<UserProfile> = withContext(Dispatchers.IO) {
        try {
            val conn = openConnection("/auth/v1/token?grant_type=password", "POST")
            conn.doOutput = true
            val body = JSONObject().apply {
                put("email", email)
                put("password", password)
            }

            OutputStreamWriter(conn.outputStream).use { it.write(body.toString()) }

            val responseCode = conn.responseCode
            if (responseCode in 200..299) {
                val responseText = readStream(conn.inputStream)
                val json = JSONObject(responseText)
                val token = json.getString("access_token")
                val userObj = json.getJSONObject("user")
                val id = userObj.getString("id")
                val userMeta = userObj.optJSONObject("user_metadata")
                val fullName = userMeta?.optString("full_name", email.substringBefore("@")) ?: email.substringBefore("@")
                val role = userMeta?.optString("role", "SUPER_USER") ?: "SUPER_USER"

                authToken = token
                currentUserId = id

                val profile = UserProfile(
                    id = id,
                    fullName = fullName,
                    email = email,
                    role = role,
                    avatarUrl = null,
                    securityScore = 98,
                    mfaEnabled = true
                )
                Result.success(profile)
            } else {
                val errorText = readStream(conn.errorStream)
                Result.failure(Exception("Login failed: $errorText"))
            }
        } catch (e: Exception) {
            Log.e(tag, "Login exception", e)
            Result.failure(e)
        }
    }

    suspend fun register(email: String, password: String, fullName: String): Result<UserProfile> = withContext(Dispatchers.IO) {
        try {
            val conn = openConnection("/auth/v1/signup", "POST")
            conn.doOutput = true
            val dataObj = JSONObject().apply {
                put("full_name", fullName)
                put("role", "SUPER_USER")
            }
            val body = JSONObject().apply {
                put("email", email)
                put("password", password)
                put("data", dataObj)
            }

            OutputStreamWriter(conn.outputStream).use { it.write(body.toString()) }

            val responseCode = conn.responseCode
            if (responseCode in 200..299) {
                val responseText = readStream(conn.inputStream)
                val json = JSONObject(responseText)
                val token = json.optString("access_token", null)
                val userObj = json.optJSONObject("user") ?: json
                val id = userObj.optString("id", "usr-${System.currentTimeMillis()}")

                if (token != null) {
                    authToken = token
                }
                currentUserId = id

                val profile = UserProfile(
                    id = id,
                    fullName = fullName,
                    email = email,
                    role = "SUPER_USER",
                    avatarUrl = null,
                    securityScore = 98,
                    mfaEnabled = true
                )
                Result.success(profile)
            } else {
                val errorText = readStream(conn.errorStream)
                Result.failure(Exception("Signup error: $errorText"))
            }
        } catch (e: Exception) {
            Log.e(tag, "Signup exception", e)
            Result.failure(e)
        }
    }

    suspend fun fetchAlerts(): List<SecurityAlert> = withContext(Dispatchers.IO) {
        try {
            val conn = openConnection("/rest/v1/security_alerts?select=*&order=created_at.desc&limit=20")
            if (conn.responseCode in 200..299) {
                val jsonArray = JSONArray(readStream(conn.inputStream))
                val list = mutableListOf<SecurityAlert>()
                for (i in 0 until jsonArray.length()) {
                    val obj = jsonArray.getJSONObject(i)
                    val severityStr = obj.optString("severity", "INFO")
                    val severity = when (severityStr.uppercase()) {
                        "CRITICAL" -> AlertSeverity.CRITICAL
                        "WARNING" -> AlertSeverity.WARNING
                        else -> AlertSeverity.INFO
                    }
                    list.add(
                        SecurityAlert(
                            id = obj.optString("id", "alt-$i"),
                            title = obj.getString("title"),
                            description = obj.optString("description", ""),
                            timeAgo = "Live Telemetry",
                            severity = severity,
                            sourceModule = obj.optString("source_module", "Cyber SOC"),
                            resolved = obj.optBoolean("resolved", false),
                            location = obj.optString("location", "Cloud Mesh"),
                            ipAddress = obj.optString("ip_address", "127.0.0.1"),
                            deviceName = obj.optString("device", "Firewall Node")
                        )
                    )
                }
                list
            } else {
                emptyList()
            }
        } catch (e: Exception) {
            Log.w(tag, "Fetch alerts fallback: ${e.message}")
            emptyList()
        }
    }

    suspend fun createAlert(title: String, description: String, severity: String, module: String): Boolean = withContext(Dispatchers.IO) {
        try {
            val uid = currentUserId ?: return@withContext false
            val conn = openConnection("/rest/v1/security_alerts", "POST")
            conn.doOutput = true
            val body = JSONObject().apply {
                put("user_id", uid)
                put("title", title)
                put("description", description)
                put("severity", severity)
                put("source_module", module)
                put("device", "${Build.MANUFACTURER} ${Build.MODEL} (Android ${Build.VERSION.RELEASE})")
                put("resolved", false)
            }
            OutputStreamWriter(conn.outputStream).use { it.write(body.toString()) }
            conn.responseCode in 200..299
        } catch (e: Exception) {
            Log.e(tag, "Create alert failed", e)
            false
        }
    }

    suspend fun resolveAlert(alertId: String): Boolean = withContext(Dispatchers.IO) {
        try {
            val conn = openConnection("/rest/v1/security_alerts?id=eq.$alertId", "PATCH")
            conn.doOutput = true
            val body = JSONObject().apply {
                put("resolved", true)
            }
            OutputStreamWriter(conn.outputStream).use { it.write(body.toString()) }
            conn.responseCode in 200..299
        } catch (e: Exception) {
            Log.e(tag, "Resolve alert failed", e)
            false
        }
    }

    suspend fun registerDevice(): Boolean = withContext(Dispatchers.IO) {
        try {
            val uid = currentUserId ?: return@withContext false
            val conn = openConnection("/rest/v1/devices", "POST")
            conn.doOutput = true
            val body = JSONObject().apply {
                put("user_id", uid)
                put("name", "${Build.MANUFACTURER} ${Build.MODEL}")
                put("type", "MOBILE")
                put("os", "Android ${Build.VERSION.RELEASE}")
                put("ip_address", "192.168.1.145")
                put("trust_score", 99)
                put("status", "ONLINE")
            }
            OutputStreamWriter(conn.outputStream).use { it.write(body.toString()) }
            conn.responseCode in 200..299
        } catch (e: Exception) {
            Log.e(tag, "Register device failed", e)
            false
        }
    }

    private fun readStream(stream: java.io.InputStream?): String {
        if (stream == null) return ""
        val reader = BufferedReader(InputStreamReader(stream))
        val sb = StringBuilder()
        var line: String? = reader.readLine()
        while (line != null) {
            sb.append(line).append('\n')
            line = reader.readLine()
        }
        return sb.toString().trim()
    }
}
