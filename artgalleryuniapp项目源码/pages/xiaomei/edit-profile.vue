<template>
  <view class="container">
    <view class="profile-form">
      <view class="form-item">
        <label>Username:</label>
        <input type="text" v-model="username" placeholder="Enter username" />
      </view>
      <view class="form-item">
        <label>Email:</label>
        <input type="email" v-model="email" placeholder="Enter email" />
      </view>
      <view class="form-item">
        <label>Password:</label>
        <input type="password" v-model="password" placeholder="Enter password" />
      </view>
      <view class="form-item">
        <label>Confirm Password:</label>
        <input type="password" v-model="confirmPassword" placeholder="Enter confirm password" />
      </view>
      <button type="primary" @click="saveProfile">Save Changes</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  onLoad(option) {
    // Get the user ID from the previous page
    const userId = option.userId;
    // Load the user profile data from the server or storage
    this.loadProfileData(userId);
  },
  methods: {
    loadProfileData(userId) {
      // Replace with your actual API or storage logic
      uni.request({
        url: `/api/users/${userId}`,
        method: 'GET',
        success: (res) => {
          const userProfile = res.data;
          this.username = userProfile.username;
          this.email = userProfile.email;
        }
      });
    },
    saveProfile() {
      // Validate the form data
      if (this.password !== this.confirmPassword) {
        uni.showToast({
          title: 'Password and confirm password do not match',
          icon: 'none'
        });
        return;
      }
      // Replace with your actual API or storage logic
      uni.request({
        url: `/api/users/${userId}`,
        method: 'PUT',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        },
        success: (res) => {
          uni.showToast({
            title: 'Profile updated successfully',
            icon: 'success'
          });
          // Navigate back to the previous page
          uni.navigateBack();
        }
      });
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

.profile-form {
  margin-top: 20px;
}

.form-item {
  margin-bottom: 20px;
}

label {
  width: 100px;
  display: inline-block;
}

input {
  height: 30px;
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
}
</style>