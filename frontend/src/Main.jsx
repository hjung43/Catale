import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SettingsPage from "./pages/SettingsPage";
import PreferencePage from "./pages/PreferencePage";
import CocktailDetailPage from "./pages/CocktailDetailPage";
import CocktailReviewPage from "./pages/CocktailReviewPage";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import MapPage from "./pages/MapPage";
import StoreDetailPage from "./pages/StoreDetailPage";
import DiaryPage from "./pages/DiaryPage";
import DatePage from "./pages/DatePage";
import SearchPage from "./pages/SearchPage";
import MyPage from "./pages/MyPage";
import MonthlyMoodPage from "./pages/MonthlyMoodPage";
import RecommendPage from "./pages/RecommendPage";
import ChangePreferencePage from "./pages/ChangePreferencePage";
import MyCocktailPage from "./pages/MyCocktailPage";
import LikedCocktailPage from "./pages/LikedCocktailPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import ErrorPage from "./pages/ErrorPage";
import App from "./App";

function Main() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="settings" element={<SettingsPage />}>
            <Route path="deleteaccount" element={<DeleteAccountPage />} />
          </Route>
          <Route path="preference" element={<PreferencePage />} />
          <Route path="cocktail/cocktailId">
            <Route index element={<CocktailDetailPage />} />
            <Route path="review" element={<CocktailReviewPage />} />
          </Route>
          <Route path="bar">
            <Route index element={<MainPage />} />
            <Route path="result" element={<ResultPage />} />
          </Route>
          <Route path="map">
            <Route index element={<MapPage />} />
            <Route path="detail/:storenumber" element={<StoreDetailPage />} />
          </Route>
          <Route path="diary/:year">
            <Route path=":month" element={<DiaryPage />} />
            <Route path=":date" element={<DatePage />} />
          </Route>
          <Route path="search" element={<SearchPage />} />
          <Route path="my">
            <Route index element={<MyPage />} />
            <Route path="monthlymood" element={<MonthlyMoodPage />} />
            <Route path="recommend" element={<RecommendPage />} />
            <Route path="changepreference" element={<ChangePreferencePage />} />
            <Route path="mycocktail" element={<MyCocktailPage />} />
            <Route path="likedcocktail" element={<LikedCocktailPage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default Main;
