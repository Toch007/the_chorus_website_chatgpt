import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DonationForm from "@/components/DonationForm";

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-4 py-20 space-y-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Support Through Giving
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Thank you for choosing to support The Chorus Abuja. Your donation
          empowers voices and builds communities. Please enter your email and
          donation amount below.
        </p>

        {/* Donation form */}
        <DonationForm />

        {/* Bank transfer option */}
        <div className="mt-12 p-6 border rounded-lg bg-gray-50 text-gray-800 shadow">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            Bank Transfer
          </h2>
          <p className="mb-2">
            You can also support us directly via bank transfer:
          </p>
          <div className="font-medium">
            <p>
              Account Name:{" "}
              <span className="font-bold">
                The Chorus Ensemble and Music Society
              </span>
            </p>
            <p>
              Account Number: <span className="font-bold">1229281261</span>
            </p>
            <p>
              Bank Name: <span className="font-bold">Zenith Bank</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
