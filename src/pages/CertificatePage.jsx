import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { getLocalResult, topTwoSkills } from "@/components/cookie/cookie";
import CertificateView from "@/components/empathy/CertificateView";
import Footer from "@/components/empathy/Footer";

export default function CertificatePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const st = location.state || {};

  let entry = null;
  if (id === "local" && st.fallback) {
    entry = { child_name: st.childName || "", report: st.report };
  } else {
    entry = getLocalResult(id);
  }

  if (!entry || !entry.report) {
    return (
      <div className="mx-auto max-w-xl px-5 pb-20 pt-16 text-center">
        <p className="body-text">That result is not on this device.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Back to the start
        </Link>
        <Footer />
      </div>
    );
  }

  return (
    <CertificateView
      childName={entry.child_name || "your child"}
      topTwo={topTwoSkills(entry.report)}
      onBack={() => navigate(`/result/${id}`, { state: st })}
    />
  );
}