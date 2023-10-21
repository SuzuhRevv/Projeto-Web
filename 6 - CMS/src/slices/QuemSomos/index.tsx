import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Blog`.
 */
export type BlogProps = SliceComponentProps<Content.BlogSlice>;

/**
 * Component for "Blog" Slices.
 */
const Blog = ({ slice }: BlogProps): JSX.Element => {
  return (
    <span className="title">
      <PrismicRichText field={slice.primary.blog_title} />
      <PrismicRichText field={slice.primary.blog_description} />
      <PrismicNextImage field={slice.primary.blog_image} />
    </span>
  );
};

export default Blog;
