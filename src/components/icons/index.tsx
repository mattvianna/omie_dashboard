import DashboardIcon from "./DashboardIcon";
import ProductsIcon from "./ProductsIcon";
import UsersIcon from "./UsersIcon";
import ConfigIcon from "./ConfigIcon";
import StarIcon from "./StarIcon";
import PriceIcon from "./PriceIcon";
import CategoriesIcon from "./CategoriesIcon";
import StockIcon from "./StockIcon";
import TotalProductsIcon from "./TotalProductsIcon";
import GridIcon from "./GridIcon";
import ListIcon from "./ListIcon";
import ChevronRightIcon from "./ChevronRightIcon";
import ChevronLeftIcon from "./ChevronLeftIcon";

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
  Grid: <GridIcon size={defaultSize} />,
  List: <ListIcon size={defaultSize} />,
  ChevronRight: <ChevronRightIcon size={defaultSize} />,
  ChevronLeft: <ChevronLeftIcon size={defaultSize} />,
};