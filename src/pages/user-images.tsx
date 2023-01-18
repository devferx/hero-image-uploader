import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { unstable_getServerSession } from "next-auth";

import { getUserImages } from "@img-firebase/db/getUserImages";
import { authOptions } from "@pages/api/auth/[...nextauth]";

import { Layout } from "@components/Layout";
import { Gallery } from "@components/Gallery";

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const images = await getUserImages(session.user?.email!);
  const name = session.user?.name ?? "User";

  return {
    props: {
      images,
      name,
    },
  };
};

function UserImages({
  images,
  name,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout isContainer={false} pageName={`${name} images`}>
      <Gallery images={images} />
    </Layout>
  );
}

export default UserImages;
