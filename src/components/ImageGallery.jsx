import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Header from './Header';
import Search from './Search';
import Image from './Image';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]); // Store uploaded images
  const [selectedCategory, setSelectedCategory] = useState(''); // Store selected category

  // Simulate loading images from an API
  useEffect(() => {
    // Replace this with your actual image data fetching logic
    setTimeout(() => {
      const sampleImages = [
        { id: 1, imageUrl: 'image1.jpg', tags: ['nature', 'landscape'] },
        { id: 2, imageUrl: 'image2.jpg', tags: ['city', 'urban'] },
        { id: 3, imageUrl: 'image3.jpg', tags: ['animals', 'wildlife'] },
        // Add more images here
      ];
      setImages(sampleImages);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay for loading
  }, []);

  // Filter images based on search term
  const filteredImages = images.filter((image) =>
    image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
  
    const updatedImages = [...filteredImages];
    const [reorderedImage] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedImage);
  
    // Update the state with the new order of images
    setFilteredImages(updatedImages);
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        // Now you can store the `imageUrl` in your state or do further processing.
        const newImage = { imageUrl, category: selectedCategory };
        setUploadedImages((prevImages) => [...prevImages, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInput = (value) => {
    setSelectedCategory(value); // Store the selected category/tag
  };

  return (
    <div className="app">
      <Header />
      <Search searchTerm={searchTerm} onSearch={setSearchTerm} />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input
        type="text"
        placeholder="Enter tags or categories"
        onChange={(e) => handleTagInput(e.target.value)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="image-grid"
            >
              {filteredImages.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={`image-${image.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Image imageUrl={image.imageUrl} tags={image.tags} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="uploaded-images">
        {uploadedImages.map((image, index) => (
          <div key={index}>
            <img src={image.imageUrl} alt={`Uploaded ${image.category} image`} />
            <div>Category: {image.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
