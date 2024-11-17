// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import liff from '@line/liff';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // LIFF初期化
    liff.init({ liffId: '2006575632-lkbPBVBw' }).then(() => {
      if (liff.isLoggedIn()) {
        // ログインしている場合、ユーザープロフィールを取得
        liff.getProfile().then(profile => {
          setProfile(profile);
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

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>ユーザー情報</h1>
      <img src={profile.pictureUrl} alt="User's Profile" />
      <p>名前: {profile.displayName}</p>
    </div>
  );
};

export default UserProfile;
