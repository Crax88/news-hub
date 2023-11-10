import { createInstance } from "./api-instance";
import type { BodyType } from "./api-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  // eslint-disable-next-line
  config: any,
  args: infer P
  // eslint-disable-next-line
) => any
  ? P
  : never;

export interface SignUpBodyDto {
  email: string;
  password: string;
}

export const signUp = (
  signUpBodyDto: BodyType<SignUpBodyDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/sign-up`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: signUpBodyDto,
    },
    options
  );
};

export interface SignInBodyDto {
  email: string;
  password: string;
}

export const signIn = (
  signInBodyDto: BodyType<SignInBodyDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<void>(
    {
      url: `/sign-in`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: signInBodyDto,
    },
    options
  );
};

export interface NewsItemDto {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  publishDate: string;
  author: {
    id: number;
    email: string;
  };
}

export const getNews = (
  params?: string,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<{ news: NewsItemDto[] }>(
    { url: `/news`, method: "get", params },
    options
  );
};

export interface CreateNewsItemDto {
  title: string;
  body: string;
  isPublished: boolean;
  publishDate: string;
}

export const createNewsItem = (
  createNewsItemDto: BodyType<CreateNewsItemDto>,
  options?: SecondParameter<typeof createInstance>
) => {
  return createInstance<NewsItemDto>(
    {
      url: `/news`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: createNewsItemDto,
    },
    options
  );
};
