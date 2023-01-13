import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "@pages/api/auth/[...nextauth]";
import { Layout } from "@components/Layout";
import { getUserImages } from "@img-firebase/db/getUserImages";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const images = await getUserImages(session.user?.email!);

  return {
    props: {
      images,
    },
  };
};

function UserImages({
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout isGalery>
      {images.map((image, idx) => (
        <img key={image} className="galery-img" src={image} width="100%" />
      ))}
    </Layout>
  );
}

export default UserImages;
