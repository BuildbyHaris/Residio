import { Clock, ShieldCheck } from "lucide-react";

function OwnerApplicationStatus() {
  return (
    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100">
          <Clock className="h-6 w-6 text-[#F5732C]" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900">
            Owner Application Under Review
          </h3>

          <p className="mt-1 text-sm leading-6 text-gray-600">
            Your owner account application has been submitted successfully.
            Our admin team is currently reviewing your information and
            verification documents.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#F5732C]">
            <ShieldCheck className="h-4 w-4" />
            <span>Verification in progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerApplicationStatus;