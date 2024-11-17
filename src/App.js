import { useEffect, useState } from "react";

function App() {
  const [profile, setProfile] = useState(null);
  const lineId = "user123";

  useEffect(() => {
    fetch(`https://8hnnjp0194.execute-api.ap-northeast-1.amazonaws.com/default/user/${lineId}`)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        setProfile(data); // データをそのまま設定
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
  }, [lineId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  // データを見やすく表示
  const profileData = profile.data || {};

  return (
    <div style={{ padding: '20px' }}>
      <h1>ユーザープロフィール</h1>
      <div style={{ marginBottom: '20px' }}>
        <strong>ステータス:</strong> {profile.message}
      </div>
      
      <div style={{ display: 'grid', gap: '10px' }}>
        <div><strong>身長:</strong> {profileData.height}cm</div>
        <div><strong>体重:</strong> {profileData.weight}kg</div>
        <div><strong>目標体重:</strong> {profileData.targetWeight}kg</div>
        <div><strong>性別:</strong> {profileData.gender}</div>
        <div><strong>生年月日:</strong> {profileData.birthDate}</div>
        <div><strong>運動頻度:</strong> {profileData.exerciseFrequency}</div>
        <div><strong>食事頻度:</strong> {profileData.mealFrequency}</div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>デバッグ情報（全データ）:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(profile, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default App;