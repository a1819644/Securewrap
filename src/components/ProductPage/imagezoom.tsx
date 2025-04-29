import React, { useState } from "react";
import styled from "styled-components";

// Styling for the image container
const Container = styled.div<{ size: string }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: ${(props) =>
    props.size === "small" ? "500px" : "90%"}; /* Adjust based on size prop */
  cursor: zoom-in;
`;

// Styling for the image itself with dynamic transform
// Styled image, filtering out custom props
const Image = styled.img.withConfig({
  shouldForwardProp: (prop) =>
    !["scale", "offsetX", "offsetY", "size"].includes(prop),
})<{
  scale: number;
  offsetX: number;
  offsetY: number;
  size: string;
}>`
  width: 100%;
  height: ${(props) => (props.size === "small" ? "auto" : "100%")};
  object-fit: cover;
  transition: transform 0.3s ease-out;
  transform: scale(${(props) => props.scale})
    translate(${(props) => props.offsetX}px, ${(props) => props.offsetY}px);
`;

// Define types for props
interface ZoomImageProps {
  src: string; // Image source URL
  alt: string; // Image alt text
  size?: string; // Optional prop to control size (small, medium, etc.)
}

const ZoomImage: React.FC<ZoomImageProps> = ({ src, alt, size = "medium" }) => {
  const [scale, setScale] = useState(1); // Track zoom scale
  const [offset, setOffset] = useState({ offsetX: 0, offsetY: 0 }); // Track position of zoomed image

  // When mouse enters, zoom in
  const handleMouseEnter = () => setScale(2);

  // When mouse leaves, reset zoom and position
  const handleMouseLeave = () => {
    setScale(1); // Reset zoom
    setOffset({ offsetX: 0, offsetY: 0 }); // Reset position
  };

  // When mouse moves, update the zoom position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width - 0.5) * 100; // Calculate offset for X-axis
    const y = ((e.pageY - top) / height - 0.5) * 100; // Calculate offset for Y-axis
    setOffset({ offsetX: -x, offsetY: -y }); // Set the calculated offsets
  };

  return (
    <Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      size={size} // Pass size to the container
    >
      <Image
        src={src} // Pass the src prop here
        alt={alt} // Pass the alt prop here
        scale={scale}
        offsetX={offset.offsetX}
        offsetY={offset.offsetY}
        size={size} // Pass size to the image itself
      />
    </Container>
  );
};

export default ZoomImage;
