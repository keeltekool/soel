import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import DigestPage from "@/pages/DigestPage";
import ArticlePage from "@/pages/ArticlePage";
import ArchivePage from "@/pages/ArchivePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DigestPage feed="ai-tools" />} />
        <Route path="/indie" element={<DigestPage feed="indie-builders" />} />
        <Route path="/youtube" element={<DigestPage feed="youtube" />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Route>
    </Routes>
  );
}
