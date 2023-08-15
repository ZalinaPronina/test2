import { picoapp } from "picoapp"

import AccountLogin from "theme/theme1/scripts/components/AccountLogin"
import Address from "theme/theme1/scripts/components/Address"
import AddressForm from "theme/theme1/scripts/components/AddressForm"
import CartDepositItem from "theme/theme1/scripts/components/CartDepositItem"
import CollapsibleContent from "theme/theme1/scripts/components/CollapsibleContent"
import ContentToggle from "theme/theme1/scripts/components/ContentToggle"
import FacetsDesktop from "theme/theme1/scripts/components/FacetsDesktop"
import Header from "theme/theme1/scripts/components/Header"
import HeaderNav from "theme/theme1/scripts/components/HeaderNav"
import IframeVideo from "theme/theme1/scripts/components/IframeVideo"
import MenuDrawer from "theme/theme1/scripts/components/MenuDrawer"
import Modal from "theme/theme1/scripts/components/Modal"
import ModalVideo from "theme/theme1/scripts/components/ModalVideo"
import ProductCarousel from "theme/theme1/scripts/components/ProductCarousel"
import ProductCounter from "theme/theme1/scripts/components/ProductCounter"
import ProductItem from "theme/theme1/scripts/components/ProductItem"
import ProductSelection from "theme/theme1/scripts/components/ProductSelection"
import Tabs from "theme/theme1/scripts/components/Tabs"
import Cart from "theme/theme1/scripts/pages/Cart"
import CheckoutProcessPlayer from "theme/theme1/scripts/pages/CheckoutProcessPlayer"
import CheckoutProcessTeam from "theme/theme1/scripts/pages/CheckoutProcessTeam"
import Collection from "theme/theme1/scripts/pages/Collection"
import Product from "theme/theme1/scripts/pages/Product"
import Columns from "theme/theme1/scripts/sections/Columns"
import ColumnsSlider from "theme/theme1/scripts/sections/ColumnsSlider"
import Faq from "theme/theme1/scripts/sections/Faq"
import ImageGridSlider from "theme/theme1/scripts/sections/ImageGridSlider"
import LogoList from "theme/theme1/scripts/sections/LogoList"
import MediaSlider from "theme/theme1/scripts/sections/MediaSlider"
import MediaText from "theme/theme1/scripts/sections/MediaText"
import Metrics from "theme/theme1/scripts/sections/Metrics"
import MetricsGrid from "theme/theme1/scripts/sections/MetricsGrid"
import OfferApp from "theme/theme1/scripts/sections/OfferApp"
import PageNavigation from "theme/theme1/scripts/sections/PageNavigation"
import Register from "theme/theme1/scripts/sections/Register"
import Reviews from "theme/theme1/scripts/sections/Reviews"
import TextBlocksBorder from "theme/theme1/scripts/sections/TextBlocksBorder"
import TextMedia from "theme/theme1/scripts/sections/TextMedia"

const initialState = { navigation: {} }

const components = {
  AccountLogin,
  Address,
  AddressForm,
  Cart,
  CartDepositItem,
  CheckoutProcessPlayer,
  CheckoutProcessTeam,
  ContentToggle,
  Collection,
  CollapsibleContent,
  Columns,
  ColumnsSlider,
  FacetsDesktop,
  Faq,
  Header,
  HeaderNav,
  LogoList,
  MediaSlider,
  MediaText,
  MenuDrawer,
  Metrics,
  MetricsGrid,
  Modal,
  ModalVideo,
  IframeVideo,
  OfferApp,
  PageNavigation,
  ProductItem,
  ProductSelection,
  ProductCarousel,
  ProductCounter,
  Product,
  Register,
  Reviews,
  Tabs,
  TextMedia,
  TextBlocksBorder,
  ImageGridSlider,
}

export default picoapp(components, initialState)
