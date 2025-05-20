import { useEffect, useState } from "react";
import axios from "axios";
import { Mock } from "../mockdata";

// Placeholder type for LinkedIn post data
export interface LinkedInPost {
  id: string;
  authorName: string;
  authorProfilePicture: string;
  authorHeadline: string;
  text: string;
  reshare?: {
    authorName: string;
    text: string;
    mediaUrl?: string;
  };
  totalReactionCount: number;
  timestamp: string;
  postUrl: string;
  mediaUrl?: string;
}

interface UseFetchPostsResult {
  posts: typeof Mock[];
  loading: boolean;
  error: string | null;
}

export const useFetchPosts = (): UseFetchPostsResult => {
  const [posts, setPosts] = useState<typeof Mock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with your actual RapidAPI endpoint and headers
        const response = await axios.post(
          "https://linkedin-api8.p.rapidapi.com/search-posts",
          {
            keyword: "microsoft",
            sortBy: "date_posted",
            datePosted: "",
            page: 1,
            contentType: "",
            fromMember: [
              "ACoAAAEkwwAB9KEc2TrQgOLEQ-vzRyZeCDyc6DQ",
              "ACoAAANuWM8BtmA18VYdgqPtIWt6GhBCTDXToV4",
              "ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc",
            ],
            // fromCompany: [1441, 1035],
            // mentionsMember: [
            //   "ACoAAAEkwwAB9KEc2TrQgOLEQ-vzRyZeCDyc6DQ",
            //   "ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc",
            // ],
            // mentionsOrganization: [1441, 1035],
            // authorIndustry: [96, 4],
            // authorCompany: [1035],
            // authorTitle: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-rapidapi-host": "linkedin-api8.p.rapidapi.com",
              "x-rapidapi-key":
                "41287747e9msh2ef0a8851132d01p1533a1jsnb77a1e6ab0f2",
            },
          }
        );
        setPosts(response.data.data.items || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
