import React, { useEffect, useState } from 'react';
import liff from '@line/liff';

function App() {
  const [lineId, setLineId] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // LIFF初期化
    liff.init({ liffId: '2006575632-lkbPBVBw' }).then(() => {
      if (liff.isLoggedIn()) {
        // ログインしている場合、ユーザーIDを取得
        liff.getProfile().then(profile => {
          const userId = profile.userId;
          setLineId(userId);
          // lineIdを使ってDynamoDBからデータを取得
          fetchProfileData(userId);
        }).catch(error => {
          console.error('プロフィール取得エラー:', error);
        });
      } else {
        liff.login(); // ログインしていない場合はログインを促す
      }
    }).catch(error => {
      console.error('LIFF初期化エラー:', error);
    });
  }, []);

  const fetchProfileData = (lineId) => {
    fetch(`https://8hnnjp0194.execute-api.ap-northeast-1.amazonaws.com/default/user/${lineId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const profileData = JSON.parse(data.body);  // body がある場合
        setProfile(profileData);
      })
      .catch(error => console.error("Error fetching profile:", error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ユーザープロフィール</h1>
      {lineId ? (
        <div>
          <p>ユーザーID: {lineId}</p>
          {profile && (
            <div>
              <p>名前: {profile.name}</p>
              <p>生年月日: {profile.birthDate}</p>
              <p>身長: {profile.height}</p>
              {/* 必要なデータを表示 */}
            </div>
          )}
        </div>
      ) : (
        <p>ユーザーIDを読み込んでいます...</p>
      )}
    </div>
  );
}

export default App;