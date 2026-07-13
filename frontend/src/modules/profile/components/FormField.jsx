function FormField({
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  name,
  error,
  disabled = false,
  options = [],
  rows = 4,
  maxLength,
}) {
  const inputClass = `w-full px-4 py-2.5 border rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 transition-colors ${disabled
    ? "bg-gray-100 cursor-not-allowed"
    : ""
    } ${error
      ? "border-red-400 focus:ring-red-200 focus:border-red-500"
      : "border-gray-200 focus:ring-[#F5732C]/30 focus:border-[#F5732C]"
    }`;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          rows={rows}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={inputClass}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={inputClass}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={inputClass}
        />
      )}

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;