"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Store,
  Calendar,
  Search,
  Sparkles,
  ChevronRight,
  Heart,
  Utensils,
  Clock,
  X,
  Compass,
  Layers,
  ArrowRight,
} from "lucide-react";

// カスタム Instagram アイコン (ビルドエラー防止用)
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// ----------------------------------------------------------------------
// 型定義
// ----------------------------------------------------------------------
interface Zone {
  id: string;
  name: string;
  shortName: string;
  type: string;
  description: string;
  color: string;
  badge: string;
  floors: string[];
}

interface Stall {
  id: string;
  title: string;
  category: string;
  course: string;
  location: string;
  zoneId: string;
  room: string;
  description: string;
  menu?: string[];
  instagram?: string;
  handle?: string;
  isFood?: boolean;
  isPopular?: boolean;
}

interface TimetableItem {
  time: string;
  title: string;
  location: string;
  desc: string;
}

// ----------------------------------------------------------------------
// データ定義
// ----------------------------------------------------------------------

const ZONES: Zone[] = [
  {
    id: "building1",
    name: "1号館（一般教室棟・管理棟）",
    shortName: "1号館",
    type: "classroom",
    description: "1年模擬店、3年・4年クラス企画、本部",
    color: "bg-blue-100 text-blue-900 border-blue-300",
    badge: "主要会場",
    floors: ["1F", "2F"],
  },
  {
    id: "foodtrucks",
    name: "学生昇降口前広場",
    shortName: "昇降口前広場",
    type: "foodtruck",
    description: "人気キッチンカー出店エリア",
    color: "bg-amber-100 text-amber-900 border-amber-300",
    badge: "キッチンカー",
    floors: ["屋外"],
  },
  {
    id: "gym1",
    name: "第一体育館",
    shortName: "第一体育館",
    type: "stage",
    description: "メインステージイベント ＆ 2年模擬店エリア",
    color: "bg-rose-100 text-rose-900 border-rose-300",
    badge: "ステージ & 2年店",
    floors: ["1F"],
  },
  {
    id: "courtyard",
    name: "中庭サブステージ",
    shortName: "中庭",
    type: "stage",
    description: "アコースティックライブ / eスポーツ会場",
    color: "bg-emerald-100 text-emerald-900 border-emerald-300",
    badge: "サブステージ",
    floors: ["屋外"],
  },
  {
    id: "building7",
    name: "7号館",
    shortName: "7号館",
    type: "attraction",
    description: "3Mお化け屋敷・4Eキッキングスナイパー",
    color: "bg-purple-100 text-purple-900 border-purple-300",
    badge: "大型企画",
    floors: ["1F", "2F"],
  },
  {
    id: "media",
    name: "総合メディアセンター",
    shortName: "メディアセンター",
    type: "attraction",
    description: "4B芸能人格付けチェック",
    color: "bg-teal-100 text-teal-900 border-teal-300",
    badge: "体験企画",
    floors: ["マルチメディア教室"],
  },
  {
    id: "workshop",
    name: "3号館・機械実習工場",
    shortName: "実習工場",
    type: "academic",
    description: "ロボコン部体験・作品展示",
    color: "bg-indigo-100 text-indigo-900 border-indigo-300",
    badge: "展示体験",
    floors: ["1F"],
  },
];

const STALLS_DATA: Stall[] = [
  // --- キッチンカー ---
  {
    id: "kc-1",
    title: "ラーメン もっけだの",
    category: "キッチンカー",
    course: "外部店舗",
    location: "学生昇降口前広場",
    zoneId: "foodtrucks",
    room: "屋外ブース①",
    description: "庄内名物のコク旨ラーメン！熱々の絶品ラーメンをご賞味あれ！",
    menu: ["中華そば: 800円", "特製チャーシュー麺: 1,000円"],
    instagram: "https://www.instagram.com/mokkedanonoodle/",
    handle: "@mokkedanonoodle",
    isFood: true,
    isPopular: true,
  },
  {
    id: "kc-2",
    title: "祇園はんなりCafé",
    category: "キッチンカー",
    course: "外部店舗",
    location: "学生昇降口前広場",
    zoneId: "foodtrucks",
    room: "屋外ブース②",
    description: "京都風の抹茶スイーツや濃厚ソフトクリーム、カフェドリンクをお届け！",
    menu: ["抹茶ラテ: 500円", "京都宇治抹茶ソフト: 450円", "パフェ: 650円"],
    instagram: "https://www.instagram.com/gion_hannari_cafe/",
    handle: "@gion_hannari_cafe",
    isFood: true,
    isPopular: true,
  },
  {
    id: "kc-3",
    title: "フェリチタプラス",
    category: "キッチンカー",
    course: "外部店舗",
    location: "学生昇降口前広場",
    zoneId: "foodtrucks",
    room: "屋外ブース③",
    description: "酒田発！サクサクのチュロスと絶品クレープ・ドリンクのフルコース！",
    menu: ["揚げたてチュロス: 400円", "贅沢クレープ: 550円〜"],
    instagram: "https://www.instagram.com/felicitaplus.sakata/",
    handle: "@felicitaplus.sakata",
    isFood: true,
    isPopular: true,
  },
  // --- 模擬店 ---
  {
    id: "1-1",
    title: "1-1 絶品ほっとサンド",
    category: "1年模擬店",
    course: "1年生",
    location: "1号館 1F",
    zoneId: "building1",
    room: "111教室",
    description: "外はカリッと中はトロ〜り熱々チーズのホットサンドです！",
    isFood: true,
  },
  {
    id: "1-2",
    title: "1-2 カラフルシュワシュワドリンク",
    category: "1年模擬店",
    course: "1年生",
    location: "1号館 1F",
    zoneId: "building1",
    room: "112教室",
    description: "映える！推し色を選べるオリジナルソーダドリンクスタンド！",
    isFood: true,
  },
  {
    id: "1-3",
    title: "1-3 ジャンボわたあめ本舗",
    category: "1年模擬店",
    course: "1年生",
    location: "1号館 1F",
    zoneId: "building1",
    room: "121教室",
    description: "顔より大きい！？ふわふわカラフルわたあめ！",
    isFood: true,
  },
  {
    id: "1-4",
    title: "1-4 もちもちスイーツクレープ",
    category: "1年模擬店",
    course: "1年生",
    location: "1号館 1F",
    zoneId: "building1",
    room: "122教室",
    description: "手作り生地のもちもちクレープ！チョコバナナが一番人気！",
    isFood: true,
  },
  {
    id: "2-M",
    title: "2M パリッと肉汁餃子",
    category: "2年模擬店",
    course: "機械コース",
    location: "第一体育館",
    zoneId: "gym1",
    room: "体育館ブース1",
    description: "機械コースが鉄板の温度管理にこだわって焼き上げる本格餃子！",
    isFood: true,
  },
  {
    id: "2-E",
    title: "2E 爆発ポップコーンFactory",
    category: "2年模擬店",
    course: "電気・電子コース",
    location: "第一体育館",
    zoneId: "gym1",
    room: "体育館ブース2",
    description: "バター醤油・塩キャラメルフレーバーの出来立てポップコーン！",
    isFood: true,
  },
  {
    id: "2-I",
    title: "2I 伝統の秘伝玉こんにゃく",
    category: "2年模擬店",
    course: "情報コース",
    location: "第一体育館",
    zoneId: "gym1",
    room: "体育館ブース3",
    description: "山形名物！味がしっかり染み込んだ熱々の玉こんにゃく！",
    isFood: true,
  },
  {
    id: "2-B",
    title: "2B 炭火風香るやきとり屋",
    category: "2年模擬店",
    course: "化学・生物コース",
    location: "第一体育館",
    zoneId: "gym1",
    room: "体育館ブース4",
    description: "ジューシーな焼き鳥！タレと塩でお好みの味を選べます。",
    isFood: true,
  },
  // --- 企画・部活 ---
  {
    id: "3-M",
    title: "3M 廃病院からの脱出 (お化け屋敷)",
    category: "クラス企画",
    course: "機械コース",
    location: "7号館 1F",
    zoneId: "building7",
    room: "711・712教室",
    description: "機械コースの本気仕掛け！悲鳴必至の本格ホラーハウス。",
    isPopular: true,
  },
  {
    id: "3-E",
    title: "3E レトロレトロゲームカフェ",
    category: "クラス企画",
    course: "電気・電子コース",
    location: "1号館 1F",
    zoneId: "building1",
    room: "123教室",
    description: "電子工作で自作したアーケードゲーム機で遊べるレトロカフェ！",
  },
  {
    id: "3-I",
    title: "3I KOSEN Cyber BAR (ノンアル)",
    category: "クラス企画",
    course: "情報コース",
    location: "1号館 2F",
    zoneId: "building1",
    room: "132教室",
    description: "LEDライティングがおしゃれなサイバー空間で楽しむノンアルカクテル。",
    isFood: true,
  },
  {
    id: "3-B",
    title: "3B 科学の不思議純喫茶",
    category: "クラス企画",
    course: "化学・生物コース",
    location: "1号館 2F",
    zoneId: "building1",
    room: "133教室",
    description: "色が変わるハーブティーや実験風スイーツを楽しめる実験的カフェ！",
    isFood: true,
  },
  {
    id: "4-M",
    title: "4M 鶴高ホストクラブ 〜極上のひととき〜",
    category: "クラス企画",
    course: "機械コース",
    location: "1号館 1F",
    zoneId: "building1",
    room: "113教室",
    description: "4Mのイケメン（？）たちがスーツ姿で温かいおもてなしをお届け！",
  },
  {
    id: "4-E",
    title: "4E リアル体感！キッキングスナイパー",
    category: "クラス企画",
    course: "電気・電子コース",
    location: "7号館 2F",
    zoneId: "building7",
    room: "722教室",
    description: "動くターゲットを狙って蹴り飛ばせ！高得点者には豪華景品あり！",
  },
  {
    id: "4-I",
    title: "4I KOSEN CASINO (カジノ)",
    category: "クラス企画",
    course: "情報コース",
    location: "1号館 2F",
    zoneId: "building1",
    room: "131教室",
    description: "ブラックジャック・ルーレットでチップを増やそう！本格カジノ体験。",
  },
  {
    id: "4-B",
    title: "4B 芸能人格付けチェック to KOSEN",
    category: "クラス企画",
    course: "化学・生物コース",
    location: "総合メディアセンター",
    zoneId: "media",
    room: "マルチメディア教室",
    description: "一流高専生は誰だ！？味覚や音感の違いを見極める体験型ゲーム！",
  },
  {
    id: "club-robocon",
    title: "ロボコン部 実演＆操縦体験コーナー",
    category: "部活展示",
    course: "部活動",
    location: "3号館・機械実習工場",
    zoneId: "workshop",
    room: "実習工場 1F",
    description: "高専ロボコン出場マシンを実際に操縦できるチャンス！巨大メカの迫力を体感しよう。",
    isPopular: true,
  },
];

const STAGE_TIMETABLE: TimetableItem[] = [
  {
    time: "10:00 - 10:30",
    title: "オープニングセレモニー",
    location: "第一体育館 メインステージ",
    desc: "高専祭開幕宣言！吹奏楽部によるオープニング演奏",
  },
  {
    time: "10:45 - 11:45",
    title: "漢気！筋肉腕立て伏せ大会",
    location: "第一体育館 メインステージ",
    desc: "学科対抗の熱き筋トレバトル！",
  },
  {
    time: "12:00 - 13:00",
    title: "中庭アコースティックライブ",
    location: "中庭サブステージ",
    desc: "軽音部による爽やかな秋空アコースティック演奏",
  },
  {
    time: "13:15 - 14:15",
    title: "高専お笑いグランプリ2026",
    location: "第一体育館 メインステージ",
    desc: "学生芸人による白熱の漫才＆コント頂上決戦",
  },
  {
    time: "14:30 - 15:30",
    title: "eスポーツ大会 決勝戦 (スマブラ)",
    location: "中庭サブステージ",
    desc: "大画面モニターで繰り広げられる熱狂バトル！",
  },
  {
    time: "15:45 - 16:30",
    title: "ダンス部 パフォーマンス",
    location: "第一体育館 メインステージ",
    desc: "キレキレのダンスで体育館を揺らす！",
  },
  {
    time: "16:30 - 17:00",
    title: "フィナーレ ＆ 大抽選会",
    location: "第一体育館 メインステージ",
    desc: "豪華景品が当たる！感動のグランドフィナーレ",
  },
];

export default function Home() {
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"map" | "stalls" | "timetable">("map");
  const [selectedZoneId, setSelectedZoneId] = useState<string>("building1");
  const [selectedCourse, setSelectedCourse] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedStallDetail, setSelectedStallDetail] = useState<Stall | null>(null);

  const activeZoneObj = useMemo(() => {
    return ZONES.find((z) => z.id === selectedZoneId);
  }, [selectedZoneId]);

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredStalls = useMemo(() => {
    return STALLS_DATA.filter((stall) => {
      const matchCourse =
        selectedCourse === "ALL" || stall.course === selectedCourse;
      const matchSearch =
        searchQuery === "" ||
        stall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.room.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCourse && matchSearch;
    });
  }, [selectedCourse, searchQuery]);

  const zoneStalls = useMemo(() => {
    return STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);
  }, [selectedZoneId]);

  if (!isEntered) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <header className="pt-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            鶴岡高専 高専祭 2026 公式Webガイド
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 mb-3">
            鶴高祭 2026
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto">
            キャンパスマップ、出店・企画リスト、ステージスケジュールを手のひらに。
          </p>
        </header>

        <div className="my-auto py-8 max-w-sm mx-auto w-full z-10">
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-700/50 pb-3">
              <Calendar className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">開催日時</p>
                <p className="text-sm font-bold text-slate-200">
                  2026年 10月17日(土) - 10月18日(日)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-slate-700/50 pb-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">会場</p>
                <p className="text-sm font-bold text-slate-200">
                  国立鶴岡工業高等専門学校 キャンパス
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEntered(true)}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
            >
              マップ＆企画案内を見る
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <footer className="text-center text-xs text-slate-500 z-10 pb-4">
          © 2026 鶴岡高専 高専祭実行委員会
        </footer>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* ヘッダー */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs">
            鶴祭
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              鶴高祭 2026
            </h1>
            <p className="text-[10px] text-slate-500">鶴岡高専 キャンパスガイド</p>
          </div>
        </div>

        <button
          onClick={() => setIsEntered(false)}
          className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1 rounded bg-slate-100 border border-slate-200 cursor-pointer"
        >
          トップへ
        </button>
      </header>

      {/* メインナビゲーション (タブ) */}
      <nav className="bg-white border-b border-slate-200 sticky top-[53px] z-20 shadow-sm">
        <div className="max-w-md mx-auto grid grid-cols-3 p-1 gap-1">
          {(
            [
              { id: "map", label: "マップ・館内図", icon: Compass },
              { id: "stalls", label: "企画・出店一覧", icon: Store },
              { id: "timetable", label: "タイムテーブル", icon: Calendar },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 shrink-0 ${
                  activeTab === id ? "text-white" : "text-blue-600"
                }`}
              />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* ==================== TAB 1: マップ案内 ==================== */}
        {activeTab === "map" && (
          <div className="space-y-4">
            {/* エリア選択ボタン群 */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                エリア・棟を選択
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {ZONES.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`text-left p-2.5 rounded-lg border transition-all relative overflow-hidden cursor-pointer ${
                      selectedZoneId === zone.id
                        ? "border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-800">
                        {zone.shortName}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {zone.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">
                      {zone.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 選択されたエリアの詳細情報 */}
            {activeZoneObj && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-900 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
                        Zone Detail
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {activeZoneObj.name}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        {activeZoneObj.description}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {activeZoneObj.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>階層・場所: {activeZoneObj.floors.join(" / ")}</span>
                  </div>
                </div>

                {/* 該当エリアの出店・企画リスト */}
                <div className="p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-600 flex items-center justify-between">
                    <span>このエリアの企画・店舗 ({zoneStalls.length})</span>
                  </h4>

                  <div className="space-y-2">
                    {zoneStalls.map((stall) => (
                      <div
                        key={stall.id}
                        onClick={() => setSelectedStallDetail(stall)}
                        className="p-3 rounded-lg border border-slate-200 hover:border-blue-400 bg-white transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="space-y-1 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                              {stall.title}
                            </span>
                            {stall.isFood && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                飲食
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            場所: {stall.room}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => toggleFavorite(stall.id, e)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                favorites.includes(stall.id)
                                  ? "fill-rose-500 text-rose-500"
                                  : ""
                              }`}
                            />
                          </button>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: 出店・企画一覧 ==================== */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* 検索・フィルターバー */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="企画名・メニュー・部屋番号で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* コース／カテゴリー フィルター */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: "ALL", name: "すべて" },
                  { id: "1年生", name: "1年" },
                  { id: "機械コース", name: "機械 (M)" },
                  { id: "電気・電子コース", name: "電気電子 (E)" },
                  { id: "情報コース", name: "情報 (I)" },
                  { id: "化学・生物コース", name: "化生 (B)" },
                  { id: "外部店舗", name: "キッチンカー" },
                ].map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      selectedCourse === course.id
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {course.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 出店カードリスト */}
            <div className="space-y-3">
              {filteredStalls.map((stall) => (
                <div
                  key={stall.id}
                  onClick={() => setSelectedStallDetail(stall)}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-blue-400 transition-all cursor-pointer space-y-2 relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-1">
                        {stall.category} • {stall.course}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        {stall.title}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => toggleFavorite(stall.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(stall.id)
                            ? "fill-rose-500 text-rose-500"
                            : ""
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {stall.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {stall.location} ({stall.room})
                    </span>
                    <span className="text-blue-600 font-medium flex items-center gap-0.5">
                      詳細を見る <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: タイムテーブル ==================== */}
        {activeTab === "timetable" && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              ステージイベント スケジュール
            </h2>

            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
              {STAGE_TIMETABLE.map((item, idx) => (
                <div key={idx} className="relative pl-7 space-y-1">
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                  <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {item.time}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 詳細モーダル */}
      {selectedStallDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto p-5 space-y-4 relative">
            <button
              onClick={() => setSelectedStallDetail(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {selectedStallDetail.category} • {selectedStallDetail.course}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                {selectedStallDetail.title}
              </h2>
            </div>

            <div className="space-y-2 border-y border-slate-100 py-3 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>場所:</strong> {selectedStallDetail.location} (
                  {selectedStallDetail.room})
                </span>
              </p>
              {selectedStallDetail.instagram && (
                <p className="flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>
                    <strong>Instagram:</strong>{" "}
                    <a
                      href={selectedStallDetail.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline font-medium"
                    >
                      {selectedStallDetail.handle}
                    </a>
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800">企画・店舗概要</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedStallDetail.description}
              </p>
            </div>

            {selectedStallDetail.menu && (
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  メニュー例
                </h4>
                <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                  {selectedStallDetail.menu.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => toggleFavorite(selectedStallDetail.id)}
                className={`flex-1 py-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  favorites.includes(selectedStallDetail.id)
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(selectedStallDetail.id)
                      ? "fill-rose-500 text-rose-500"
                      : ""
                  }`}
                />
                {favorites.includes(selectedStallDetail.id)
                  ? "お気に入り解除"
                  : "お気に入りに追加"}
              </button>
              <button
                onClick={() => setSelectedStallDetail(null)}
                className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}