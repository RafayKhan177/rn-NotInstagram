import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Divider } from "react-native-elements";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const PLACEHOLDER_IMG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARIAAAC4CAMAAAAYGZMtAAAAdVBMVEVpXM2HfdFeUc7/8rbdyr7/7LiFe9H/87ZZTM9mWc1kV87/8LedjsdiVc5xZMzn1L6hlM1/ddKtncTz37qyosTWw7+XjM5+ccr96LmUhciGeMrXxb7/97VrXs1dUM6tn8p6cdPLucDiz72Rhs90bNTv27q6qcNOvLJNAAABwUlEQVR4nO3bXXPSQBiAUUyMdBPSKh9FpB+olf//EwUGCs72YsNY0Ow5V9wwszyThJdhdzAAAAAAAAAAAAAAAAAAAAAAAPjvtEUX7bWXewH1+GMX0xyaTJoyXTW8ufZ6L2DSPH9Odf81jyTl/adUq3ySfEgkiSSS7EkSkSQiyUFoQ9hNopLshUVVNd+3TSTZa6dNNZxJcmKTZDlw45xqp+Ws2L2SZE+SiCQRSSKSRCQ5CnVdB0lOhPloNFrUkhw9VU1TPiyCJK9uhtXd3Y9bV8nRJsmqKDxLTmySzDdPV0mOJIlIEpEk8laSn19SvWSSZPOtnKyPf5NHScKvDhsHyqZ6uvIH+PviJNsJP93uzf0S3zjb34Hp+lfkjSQpQp/3Hp2VJLyMH99xTVd2VpJi9jDu73VyZpKyx9v2JImcJkkeMZ4ySdIsB7eJBssmjyRVk6zKIcl2M0UXix7OaHuHJJuhNXTQx6n14DUJB92SZHGwolOSx+U6gyZdkoRvw8m7Lubf0C1JKcmf8kmyKto0xTyXJOtxoud1k0mS9INrTRZJ2mmn043j+toLvgBnYAEAAAAAAAAAAAAAAAAAAACA3vsNEW1B3Y++7NIAAAAASUVORK5CYII=";

const FormikPostUploader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => console.log(values)}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{ uri: thumbnailUrl ? thumbnailUrl : PLACEHOLDER_IMG }}
              style={{
                width: 100,
                height: 100,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
            <View style={{ flex: 1, marginLeft: 12, marginTop: 10 }}>
              <TextInput
                style={{ color: "white", fontSize: 15 }}
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider width={0.2} orientation="vertical" />
          <TextInput
            onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
            style={{ color: "white", fontSize: 15 ,paddingVertical:20}}
            placeholder="Enter image URL..."
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button onPress={handleSubmit} title={"Share"} disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
