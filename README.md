# Photography Platform

**Description**: Photographers can showcase their exceptional work on this site and interact with other users, receiving valuable likes and comments. For users, if you're looking for photography services, explore photographers' portfolios, or simply request a specific service by providing a description of your requirements.

**Documentation**: [Pixle Time Api Documentation](https://photography-documentation.gitbook.io/pixle-time/)
**Deploy**: [Pixle Time Deploy](https://pixle-time.onrender.com)

## Table of Contents
- [Vision](#vision)
- [Scope](#scope)
- [Minimum Viable Product](#minimum-viable-product)
- [Stretch Goals](#stretch-goals)
- [Functional Requirements](#functional-requirements)
- [Data Flow](#data-flow)
- [Non-Functional Requirements](#non-functional-requirements)
- [Database Schema](#database-schema)



## Vision

**What is the vision of this product?**
To provide a specialized platform for photographers to upload their photos and build portfolios, share experiences, and exchange opinions.

**What pain point does this project solve?**
Addressing the lack of a proper place for photographers to publish and exchange photos, as well as providing a platform to find specific images.

**Why should we care about your product?**
Whether you're a photographer looking to showcase your work, give opinions on others' work, or simply seek inspiration, our product offers a solution.

## Scope (In/Out)

#### IN - What will your product do

##### High-Level Overviews:

- **Authentication/Authorization**: Each user signs up and signs in for secure access and user permissions management.

- **Add Photo**: Users can contribute photos with descriptions to share their work or experiences.

- **Like, Comment, Share**: Registered users can interact with other users' photos through likes, comments, and sharing.

- **Follow**: Users can follow each other to receive updates on their activities.

- **Chat**: Direct communication between users through text message chat.

- **Routes**: Users have personalized homepages and profiles to showcase their work and receive updates.

- **Request Photography**: Users can request photography services tailored to their needs. They can also post requests and receive offers from photographers.

#### OUT - What will your product not do

Our product won't support many languages and is limited to photos only (No videos or GIFs).

#### Minimum Viable Product

The primary purpose of the product is to provide a creative platform for photographers to share and interact with each other. The core feature is an uploading photos system that uses the photos as a feed.

#### Stretch

Stretch goals include:

- Adding more options for photos.
- Supporting videos and GIFs.
- Multilingual support.

## Functional Requirements

- **Photographers can showcase their work and interact with others through likes and comments.**
- **Users can explore photographers' portfolios and request specific photography services.**
- **Authentication/Authorization**: Users sign up and sign in for access.
- **Users can add photos with descriptions.**
- **Users can like, comment, and share photos.**
- **Users can follow each other to receive updates.**
- **Users can chat with each other.**
- **Users have personalized homepages and profiles.**
- **Users can request photography services and post requests for offers.**

### Data Flow

Photographers create accounts to upload images and build portfolios. They can follow and chat with other photographers. Users create accounts to follow, request specific photographers, chat, and browse photos.

## Non-Functional Requirements

- **Scalability**: The product needs to handle large amounts of data and photos efficiently.
- **Availability**: The product should be available and operational at all times for users.

## Database Schema

![Schema](./assests/database.png)