import DashboardIcon from "./DashboardIcon";
import ProductsIcon from "./ProductsIcon";
import UsersIcon from "./UsersIcon";
import ConfigIcon from "./ConfigIcon";
import StarIcon from "./StarIcon";
import PriceIcon from "./PriceIcon";
import CategoriesIcon from "./CategoriesIcon";
import StockIcon from "./StockIcon";
import TotalProductsIcon from "./TotalProductsIcon";

const defaultSize = 24;

export const Icons = {
  Dashboard: <DashboardIcon size={defaultSize} />,
  Config: <ConfigIcon size={defaultSize} />,
  Usuarios: <UsersIcon size={defaultSize} />,
  Produtos: <ProductsIcon size={defaultSize} />,
  StarRating: <StarIcon size={14} />,
  TotalProduct: <TotalProductsIcon size={defaultSize} />,
  Price: <PriceIcon size={defaultSize} />,
  Categories: <CategoriesIcon size={defaultSize} />,
  Stock: <StockIcon size={defaultSize} />,
};