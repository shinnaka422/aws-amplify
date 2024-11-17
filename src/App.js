import { useEffect, useState } from "react";

function App() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null); // エラー状態を追跡
  const lineId = "user123";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://8hnnjp0194.execute-api.ap-northeast-1.amazonaws.com/default/user/${lineId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors", // CORSを有効にする
          }
        );

        if (!response.ok) {
          // HTTPエラーの場合
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setProfile(data); // データを設定
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message); // エラーメッセージを設定
      }
    };

    fetchProfile();
  }, [lineId]);

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>エラーが発生しました</h1>
        <p>{error}</p>
        <p>APIやネットワーク接続を確認してください。</p>
      </div>
    );
  }

  if (!profile) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  // データを見やすく表示
  const profileData = profile.data || {};

  return (
    <div style={{ padding: "20px" }}>
      <h1>ユーザープロフィール</h1>
      <div style={{ marginBottom: "20px" }}>
        <strong>ステータス:</strong> {profile.message}
      </div>

      <div style={{ display: "grid", gap: "10px" }}>
        <div>
          <strong>身長:</strong> {profileData.height || "未設定"}cm
        </div>
        <div>
          <strong>体重:</strong> {profileData.weight || "未設定"}kg
        </div>
        <div>
          <strong>目標体重:</strong> {profileData.targetWeight || "未設定"}kg
        </div>
        <div>
          <strong>性別:</strong> {profileData.gender || "未設定"}
        </div>
        <div>
          <strong>生年月日:</strong> {profileData.birthDate || "未設定"}
        </div>
        <div>
          <strong>運動頻度:</strong> {profileData.exerciseFrequency || "未設定"}
        </div>
        <div>
          <strong>食事頻度:</strong> {profileData.mealFrequency || "未設定"}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>デバッグ情報（全データ）:</h3>
        <pre
          style={{ background: "#f5f5f5", padding: "10px", overflow: "auto" }}
        >
          {JSON.stringify(profile, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;
