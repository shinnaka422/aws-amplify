import React, { useEffect, useState } from 'react';
import liff from '@line/liff';

function App() {
  const [lineId, setLineId] = useState(null);

  useEffect(() => {
    // LIFF初期化
    liff.init({ liffId: '2006575632-lkbPBVBw' }).then(() => {
      if (liff.isLoggedIn()) {
        // ログインしている場合、ユーザーIDを取得
        liff.getProfile().then(profile => {
          setLineId(profile.userId);
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

  return (
    <div style={{ padding: '20px' }}>
      <h1>ユーザープロフィール</h1>
      {lineId ? (
        <div>
          <p>ユーザーID: {lineId}</p>
        </div>
      ) : (
        <p>ユーザーIDを読み込んでいます...</p>
      )}
    </div>
  );
}

export default App;