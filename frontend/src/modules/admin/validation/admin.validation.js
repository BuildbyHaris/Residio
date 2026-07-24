
export const validateLoginForm = (values) => {
  const errors = {};

  if (!values.email || !values.email.trim()) {
    errors.email = 'Please enter your admin email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Please enter your password.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
};


export const validateRejectionReason = (reason) => {
  if (!reason || !reason.trim()) {
    return 'Please provide a reason for rejecting this verification request.';
  }
  if (reason.trim().length < 10) {
    return 'Please provide a more detailed reason (at least 10 characters).';
  }
  if (reason.trim().length > 500) {
    return 'Rejection reason must be under 500 characters.';
  }
  return null;
};