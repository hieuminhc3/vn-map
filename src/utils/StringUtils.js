export const getPlaceName = (code) => {
  let name = "";
  if (code === "restaurant") name = "Nhà hàng";
  else if (code === "parking") name = "Bãi đỗ xe";
  else if (code === "school" || code === "primary_school") name = "Trường học";
  else if (code === "atm") name = "ATM";
  else if (code === "hospital") name = "Bệnh viện";
  else if (code === "bank") name = "Ngân hàng";
  else if (code === "gas_station") name = "Trạm xăng";
  else if (code === "lodging") name = "Khách sạn";
  return name;
};

export const getGoogleMapApikey = () => {
  return "AIzaSyBXkPBxD22XifVWkoqGe9HNJtAv_tE4TV0";
};
