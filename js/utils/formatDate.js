export const formatDate = (value, opts = {}) => {
  const {
    locale = "en-US",
    day,
    month,
    year,
    hour,
    minute,
    hour12 = true
  } = opts;

  return new Intl.DateTimeFormat(locale, {
    ...(day && { day }),
    ...(month && { month }),
    ...(year && { year }),
    ...(hour && { hour }),
    ...(minute && { minute }),
    ...(hour && { hour12 })
  }).format(new Date(value));
};
