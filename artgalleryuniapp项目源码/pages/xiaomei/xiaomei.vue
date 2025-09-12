<template>
  <view class="container">
    <view class="header">
      <view class="back" @tap="back">
        <text>Back</text>
      </view>
      <view class="profile-pic">
        <image :src="profilePic" mode="widthFix" />
      </view>
    </view>

    <view class="user-info">
      <text class="username">{{ username }}</text>
      <text class="location">{{ location }}</text>
    </view>
	
    <view class="saved">
      <text>Saved</text>
      <view class="saved-items">
        <view class="saved-item" v-for="(item, index) in savedItems" :key="index">
          <view class="saved-item-image">
            <image :src="item.image" mode="aspectFit" />
          </view>
          <view class="saved-item-info">
            <text class="saved-item-title">{{ item.title }}</text>
            <text class="saved-item-date">{{ item.date }}</text>
          </view>
        </view>
      </view>
    </view>
	
    <view class="options">
		
      <view class="option" @tap="remainder">
        <view class="option-icon">
          <icon type="calendar" color="#000000" size="20" />
        </view>
        <text class="option-text">Remainder</text>
      </view>
	  
      <view class="option" @tap="contact">
        <view class="option-icon">
          <icon type="phone" color="#000000" size="20" />
        </view>
        <text class="option-text">Contact</text>
      </view>
	  
      <view class="option" @tap="history">
        <view class="option-icon">
          <icon type="clock" color="#000000" size="20" />
        </view>
        <text class="option-text">History</text>
      </view>
	  
      <view class="option" @tap="settings">
        <view class="option-icon">
          <icon type="setting" color="#000000" size="20" />
        </view>
        <text class="option-text">Settings</text>
      </view>
      <view class="option" @tap="logout">
        <view class="option-icon">
          <icon type="exit" color="#000000" size="20" />
        </view>
        <text class="option-text">Log Out</text>
      </view>
    </view>
   
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: 'Sara Thomson',
      location: 'Sholokbohor, Chottogram',
      profilePic: '/static/img/profile.png',
	  
      savedItems: [
        {
          title: 'Ephemeral Visions: A Journey Through Time',
          date: '15th-20th Mar 2024',
          image: '/static/img/foryou/foryou_6.jpg',
        },
        {
          title: 'Ephemeral Visions: A Journey Through Time',
          date: '15th-20th Mar 2024',
          image: '/static/img/foryou/foryou_1.jpg',
        },
      ],
    };
  },
  methods: {
    back() {
      // navigate back
      uni.switchTab({
        url: '/pages/home/home',
      });
    },
    editProfile() {
      // navigate to edit profile page
      uni.navigateTo({
        url: '/pages/edit-profile/edit-profile',
      });
    },
    remainder() {
      // navigate to reminder page
      uni.navigateTo({
        url: '/pages/remainder/remainder',
      });
    },
    contact() {
      // navigate to contact page
      uni.navigateTo({
        url: '/pages/contact/contact',
      });
    },
    history() {
      // navigate to history page
      uni.navigateTo({
        url: '/pages/history/history',
      });
    },
    settings() {
      // navigate to settings page
      uni.navigateTo({
        url: '/pages/settings/settings',
      });
    },
    logout() {
      // log out
      uni.showModal({
        title: 'Log Out',
        content: 'Are you sure you want to log out?',
        showCancel: true,
        cancelText: 'Cancel',
        confirmText: 'Log Out',
        success(res) {
          if (res.confirm) {
            // perform logout logic
            uni.redirectTo({
              url: '/pages/login/login',
            });
          }
        },
      });
    },
    profile() {
      // navigate to profile page
      uni.navigateTo({
        url: '/pages/profile/profile',
      });
    },
    home() {
      // navigate to home page
      uni.switchTab({
        url: '/pages/home/home',
      });
    },
    search() {
      // navigate to search page
      uni.navigateTo({
        url: '/pages/search/search',
      });
    },
    time() {
      // navigate to time page
      uni.navigateTo({
        url: '/pages/time/time',
      });
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back {
  font-size: 16px;
  color: #000000;
}

.profile-pic {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
/*  border: 2px solid green; */
  margin-right: 220rpx;
}
.profile-pic image{
	width: 100%;
	height: 100rpx;
}
.user-info {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* border: 2px solid green; */
  text-align: center;
}

.username {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
/*  border: 2px solid green; */
}

.location {
  font-size: 14px;
  color: #888888;
}

.saved {
	
	
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
/*  border: 2px solid red; */
}

.saved-items {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
 
}

.saved-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.saved-item-image {
  width: 130px;
  height: 150px;
  margin-right: 50px;
  border-radius: 8px;
  overflow: hidden;
 /* border: 2px solid green; */
}
.saved-item-image image{
	width: 250rpx;
	height: 250rpx;
	border-radius: 20px;
	
	
}

.saved-item-info {
  flex: 1;
}

.saved-item-title {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}

.saved-item-date {
  font-size: 12px;
  color: #888888;
}

.options {
  flex: 1;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.option {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.option-icon {
  margin-right: 10px;
}

.option-text {
  font-size: 16px;
  color: #000000;
}

.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-text {
  font-size: 12px;
  color: #000000;
}
</style>