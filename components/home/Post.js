import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white", fontSize: 12 }}>
          <Text style={{ fontWeight: "800" }}>{comment.user} </Text>
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray", fontSize: 11 }}>
        View {post.comments.length > 1 ? "all" : ""}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white", fontSize: 12 }}>
      <Text style={{ fontWeight: "800" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const Likes = ({ post }) => (
  <Text
    style={{ color: "white", fontSize: 9, fontWeight: "600", marginTop: 4 }}
  >
    {post.likes.toLocaleString("en")}
  </Text>
);

const PostFooter = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={style.LeftFooterIconsContainer}>
        <Icon
          imgStyle={style.footerIcon}
          img={require("../../assets/instagram-icon-heart.png")}
        />
        <Icon
          imgStyle={style.footerIcon}
          img={require("../../assets/instagram-icon-chat-bubble.png")}
        />
        <Icon
          imgStyle={style.footerIcon}
          img={require("../../assets/instagram-icon-send.png")}
        />
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Icon
          imgStyle={style.footerIcon}
          img={require("../../assets/instagram-icon-save.png")}
        />
      </View>
    </View>
  );
};

const Icon = ({ imgStyle, img }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={img} />
  </TouchableOpacity>
);

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 450,
    }}
  >
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profilePicture }} style={style.story} />
      <Text
        style={{
          color: "white",
          marginLeft: 5,
          fontWeight: "700",
          fontSize: 9,
        }}
      >
        {post.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const style = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 25,
    height: 25,
    // marginTop:5,
    tintColor: "white",
  },
  LeftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});

export default Post;
