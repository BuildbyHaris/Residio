import { CheckCircle } from "lucide-react";

function VerifiedChip() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <CheckCircle className="w-5 h-5 text-green-600 fill-green-600" />
      <span className="text-green-600 font-medium text-sm">Verified</span>
    </span>
  );
}

export default VerifiedChip;