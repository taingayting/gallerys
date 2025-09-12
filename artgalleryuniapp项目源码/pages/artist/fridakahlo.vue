<template>
  <view class="container">
    <view class="header">
      <image class="profile-pic" src="../../static/img/artist/artist_5.jpg" mode="aspectFit"></image>
      <view class="name">Frida Kahlo</view>
      <view class="subtitle">Mexican Artist, Feminist, and Cultural Icon</view>
    </view>
    <view class="section">
      <view class="title">Early Life</view>
      <view class="content">
        Born in Coyoacán, Mexico City, Frida was the middle child of four siblings. Her father, Guillermo Kahlo, was a Hungarian-Jewish photographer, and her mother, Matilde Calderón y González, was a devout Catholic. Frida's childhood was marked by a devastating bus accident at the age of 18, which left her with multiple injuries and chronic pain.
      </view>
    </view>
    <view class="section">
      <view class="title">Artistic Career</view>
      <view class="content">
        Frida began painting during her recovery from the accident, and her art became a way to express her emotions and experiences. She was largely self-taught, but her work was influenced by Mexican folk art, surrealism, and realism. Her paintings often featured self-portraits, which were a way for her to explore her identity and emotions.
      </view>
    </view>
    <view class="section">
      <view class="title">Marriage and Politics</view>
      <view class="content">
        In 1929, Frida married muralist Diego Rivera, who was 20 years her senior. The couple had a tumultuous relationship, marked by infidelities and separations, but they remained together until Frida's death. Frida was also involved in politics, joining the Mexican Communist Party and supporting the Cuban Revolution.
      </view>
    </view>
    <view class="section">
      <view class="title">Legacy</view>
      <view class="content">
        Frida Kahlo's art and life have become an inspiration to people around the world. Her paintings are now considered iconic representations of Mexican culture and feminist art. Her legacy extends beyond her art, as she has become a symbol of resilience and determination in the face of adversity.
      </view>
    </view>
    <view class="quote">
      "Feet, what do I need you for when I have wings to fly?" - Frida Kahlo
    </view>
  </view>
</template>

<style>
 .container {
    padding: 20px;
  }
 .header {
    text-align: center;
	
  }
 .profile-pic {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 40px;
  }
 .name {
    font-size: 24px;
    font-weight: bold;
  }
 .subtitle {
    font-size: 18px;
    color: #666;
  }
 .section {
    margin-bottom: 20px;
  }
 .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
 .content {
    font-size: 16px;
    color: #333;
  }
 .quote {
    font-size: 18px;
    font-style: italic;
    color: #666;
    margin-top: 20px;
  }
</style>