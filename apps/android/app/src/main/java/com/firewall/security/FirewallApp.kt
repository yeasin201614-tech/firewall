package com.firewall.security

import android.app.Application
import androidx.work.*
import com.firewall.security.data.workers.BackgroundSecurityWorker
import java.util.concurrent.TimeUnit

class FirewallApp : Application() {

    override fun onCreate() {
        super.onCreate()
        schedulePeriodicSecuritySweep()
    }

    private fun schedulePeriodicSecuritySweep() {
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .setRequiresBatteryNotLow(true)
            .build()

        val periodicWork = PeriodicWorkRequestBuilder<BackgroundSecurityWorker>(
            repeatInterval = 1,
            repeatIntervalTimeUnit = TimeUnit.HOURS
        )
            .setConstraints(constraints)
            .build()

        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
            "FirewallAutonomousSweep",
            ExistingPeriodicWorkPolicy.KEEP,
            periodicWork
        )
    }
}
