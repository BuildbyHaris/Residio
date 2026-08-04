const AboutHostel = ({ description }) => {
  return (
    <div className="bg-white rounded-xl2 shadow-sm border border-border-light p-6">
      <h2 className="text-xl font-semibold text-ink-900 mb-3">
        About this Hostel
      </h2>
      <p className="text-ink-700 leading-7">
        {description || "No description available."}
      </p>
    </div>
  );
};

export default AboutHostel;
