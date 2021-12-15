import { useState } from "react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import HeadInfo from "../../components/global/HeadInfo";
import Title from "../../components/common/Title";
import { useWeather } from "../../hooks/useWeather";
import Carousel from "../../components/explore/Carousel";
import PostList from "../../components/explore/PostList";
import * as T from "../../types";
interface IProps {
  postData: T.PostType[];
}

const Explore = ({ postData }: IProps) => {
  const router = useRouter();
  const { department, id } = router.query;
  const [weather, renderWeathers] = useWeather(
    ["전체", "맑음", "구름", "비"],
    "전체"
  );
  const [order, setOrder] = useState("createdAt");

  useEffect(() => {
    router.push(
      `/explore/${department}?id=${id}&weather=${weather}&by=${order}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather]);

  useEffect(() => {
    router.push(
      `/explore/${department}?id=${id}&weather=${weather}&by=${order}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <>
      <HeadInfo
        title={
          department === "모든-글"
            ? "글 둘러보기 | 모든 글"
            : `글 둘러보기 | ${department}`
        }
        content={`${department}`}
      />
      {/* explore page */}
      <div className="flex justify-center md:p-8 p-4">
        <div className="lg:w-lg w-screen">
          <div className="flex flex-col content-center">
            <section>
              {/* title section */}
              <Title
                title={"글 둘러보기"}
                firstSubTitle={
                  "관련 글을 읽고 싶은 진료과를 선택할 수 있습니다."
                }
              />
              {/* carousel section */}
              <Carousel weather={weather} order={order} />
            </section>
            <section className="flex justify-center items-center my-10">
              <p className=" text-3xl text-black-main font-main font-bold">
                {department === "모든-글" ? "모든 글" : department}
              </p>
            </section>
            <section className="mb-48">
              {/* options section */}
              <section className="flex justify-between">
                {/* dropbox */}
                <div className="flex items-center">
                  <Image
                    src="/images/explore/downArrow.svg"
                    alt="downArrow"
                    width={24}
                    height={24}
                  ></Image>
                  <select
                    onChange={(e) => {
                      setOrder(e.target.value);
                    }}
                    className="ml-2 cursor-pointer appearance-none font-main font-nomal lg:text-xl text-lg text-gray-main outline-none "
                  >
                    <option value="createdAt">최신 순</option>
                    <option value="likes">응원이 필요한 순</option>
                  </select>
                </div>
                <div>{renderWeathers()}</div>
              </section>
              {/* post list section */}
              <PostList postData={postData} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { department, weather, id, by } = context.query;

  const postRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/post/${encodeURI(
      department
    )}?id=${id}&offset=0&limit=16&weather=${encodeURI(weather)}&by=${by}`
  );

  const postData = postRes.data;

  return { props: { postData } };
};

export default Explore;