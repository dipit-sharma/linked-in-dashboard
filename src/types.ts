export interface Author {
  name: string;
  title: string;
  company: string;
  profileUrl: string;
  profileImage: string;
}

export interface Video {
  url: string;
  thumbnail: string;
  duration: string;
}

export interface ResharedPost {
  isBrandPartnership: boolean;
  text: string;
  companyName: string;
  companyUrl: string;
  companyLogo: string;
  description: string;
  video?: Video;
}

export interface SocialActivityCounts {
  likes: number;
  comments: number;
  shares: number;
}

export interface SocialActivityCountsInsight {
  totalEngagement: number;
  engagementRate: number;
}

export interface LinkedInPost {
  id: string;
  urn: string;
  url: string;
  template: string;
  text: string;
  postedAt: string;
  postedDate: string;
  postedDateTimestamp: number;
  reposted: boolean;
  author: Author;
  resharedPost?: ResharedPost;
  images?: string[];
  socialActivityCounts: SocialActivityCounts;
  socialActivityCountsInsight: SocialActivityCountsInsight;
} 