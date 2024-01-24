import { format, parse, parseISO } from "date-fns";
function dateFormatter(date) {
  const parsedDate = parse(date, "dd-MM-yyyy", new Date());
  const created_at = format(new Date(parsedDate), "yyyy-MM-dd hh:mm:ss:SSS");
  return created_at;
}
function dateFormatter1(date) {
  // const parsedDate = parseISO(date);
  if (date) {
    const formattedDate = format(date, "dd-MM-yyyy");
    return formattedDate;
  }
  return null;
}

export { dateFormatter, dateFormatter1 };
