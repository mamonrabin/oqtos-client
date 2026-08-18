import { TBlog, THomeControl } from "@/types";
import React from "react";
import SectionHeader from "../shared/SectionHeader";

import BlogSlider from "../common/BlogSlider";
import SectionHeader2 from "../shared/SectionHeader2";

interface BlogProps {
  blog: THomeControl;
  bloges: TBlog[];
  isLoading: boolean;
}

const Blog: React.FC<BlogProps> = ({ blog, bloges, isLoading }) => {
  return (
    <section className="Container md:mt-12 mt-6 pb-20">
      {/* <SectionHeader
        title={blog?.title}
        subTitle={blog?.subTitle}
      /> */}

      <SectionHeader2 title={blog?.title} subTitle={blog?.subTitle} />

      <div className="">
        <BlogSlider bloges={bloges} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default Blog;
