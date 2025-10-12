import { NextRequest, NextResponse } from "next/server";

// Mock testimonials data for now
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Soprano, 3 years with The Chorus",
    content:
      "Being part of The Chorus Abuja has been transformative. The harmony we create together goes beyond music—it's about community and excellence.",
    rating: 5,
    image: "/images/member-placeholder.jpg",
  },
  {
    id: 2,
    name: "David Okwu",
    role: "Bass, Founding Member",
    content:
      "From our first rehearsal to our latest concert, every moment with The Chorus has been about pushing boundaries and creating beautiful music.",
    rating: 5,
    image: "/images/member-placeholder.jpg",
  },
  {
    id: 3,
    name: "Grace Adebayo",
    role: "Alto, 2 years with The Chorus",
    content:
      "The professionalism and passion here is unmatched. We've grown so much as musicians and as a family over these 4 years.",
    rating: 5,
    image: "/images/member-placeholder.jpg",
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: testimonials,
      message: "Testimonials retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch testimonials",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, content, rating, image } = body;

    if (!name || !content) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and content are required",
        },
        { status: 400 }
      );
    }

    const newTestimonial = {
      id: testimonials.length + 1,
      name,
      role: role || "Member",
      content,
      rating: rating || 5,
      image: image || "/images/member-placeholder.jpg",
    };

    testimonials.push(newTestimonial);

    return NextResponse.json({
      success: true,
      data: newTestimonial,
      message: "Testimonial added successfully",
    });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add testimonial",
      },
      { status: 500 }
    );
  }
}
