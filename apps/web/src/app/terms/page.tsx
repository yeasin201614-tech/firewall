import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-cyber-blue">Enterprise Agreement</span>
        <h1 className="text-4xl font-black text-white mt-2">Terms of Service & Ethical Use</h1>
        <p className="text-slate-400 text-sm mt-2">Enterprise Master Services Agreement • November 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0A1330] border border-cyber-blue/30 space-y-8 text-slate-300 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-2">1. Authorized Defensive Scope</h2>
          <p>
            FIREWALL is strictly engineered for defensive cybersecurity, authorized vulnerability assessment, identity safeguarding, and intrusion prevention on systems and devices you own or have explicit legal authorization to protect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">2. Zero-Day Defense SLA</h2>
          <p>
            Under our Pro and Enterprise tiers, our Threat Intelligence feed receives continuous updates every 15 minutes. In the event of an active intrusion under monitored endpoints, our automated containment playbooks isolate infected processes in &lt;42ms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-2">3. Continuous Compliance</h2>
          <p>
            Customers benefit from full compliance alignment with SOC 2 Type II, ISO/IEC 27001:2022, NIST SP 800-218, and OWASP ASVS 5.0 Level 3.
          </p>
        </section>
      </div>
    </div>
  );
}
