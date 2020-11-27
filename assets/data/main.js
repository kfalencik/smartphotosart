export default {
  formats: [
    {
      title: 'Standard',
      sizes: [
        {
          title: '8 x 12"',
          action: 0.2,
          price: 1
        },
        {
          title: '16 x 24"',
          action: 0.4,
          price: 2
        },
        {
          title: '24 x 36"',
          action: 0.6,
          price: 3
        },
        {
          title: '40 x 60"',
          action: 1,
          price: 5
        }
      ]
    },
    {
      title: 'Panorama',
      sizes: [
        {
          title: '9 x 16"',
          action: 0.2,
          price: 1.5
        },
        {
          title: '18 x 32"',
          action: 0.4,
          price: 2.5
        },
        {
          title: '36 x 64"',
          action: 0.6,
          price: 3.5
        },
        {
          title: '40 x 70"',
          action: 1,
          price: 6
        }
      ]
    }
  ],

  pricing: [
    {
      title: 'Fine Art Paper',
      description: 'One of the largest ranges of paper selections, while using the highest level of archival print technology allowing superior detail and color, you can create custom giclee prints of your artwork and photos.',
      image: 'paper-matte.jpg',
      finishes: [
        {
          title: 'Matte',
          description: 'Matte Paper, our house stock fine art paper, also known as Moab Lasal Photo Matte, is an economical favorite for fine art reproductions and photo prints. It features a smooth surface, heavy weight (230 g, 9.5-mil), neutral white, matte paper engineered for accurate color reproduction that provides high contrast and high-resolution output. This paper is acid-free making it the perfect choice for both photography & fine art reproductions.',
          image: 'paper-matte.jpg',
          styles: [
            {
              title: 'Borderless',
              description: 'The image will go to the edge of the print. In order to accomplish borderless printing the image will be enlarged approximately by 1/10 to 1/8 of an inch to give the appropriate amount of bleed necessary for cutting.',
              image: 'paper-borderless.jpg',
              sizes: [12, 36, 80, 225]
            },
            {
              title: 'Dibond',
              description: 'Flush mounted (borderless) on Dibond®, a rigid, durable aluminum composite material combines two thin layers of aluminum with a solid polyethylene core.',
              image: 'paper-dibond.jpg',
              sizes: [40, 80, 170, null]
            }
          ]
        },
        {
          title: 'Velvet',
          description: 'Officially Moab\'s Somerset Enhanced Velvet, this paper was previously labeled by FinerWorks simply \'Fine Art Paper\'. This popular paper is also distrubuted under the brands Epson Somerset Velvet and Canon Fine Art Enhanced Velvet. This textured paper favored by artists and photographers alike is milled by the St. Cuthberts Mill in Somerset, England. It is an acid-free, 100% cotton, single-side coated paper showing a natural white finish with a slightly textured matte surface has a soft velvet-like feel. A high-quality, mould-made paper, it is ideal for digital fine art reproductions. We now print this on Canon Printers using the Canon Lucia inks due to their superior archivability and increased color range.',
          image: 'paper-velvet.jpg',
          styles: [
            {
              title: 'Borderless',
              description: 'The image will go to the edge of the print. In order to accomplish borderless printing the image will be enlarged approximately by 1/10 to 1/8 of an inch to give the appropriate amount of bleed necessary for cutting.',
              image: 'paper-borderless.jpg',
              sizes: [20, 50, 100, 275]
            },
            {
              title: 'Dibond',
              description: 'Flush mounted (borderless) on Dibond®, a rigid, durable aluminum composite material combines two thin layers of aluminum with a solid polyethylene core.',
              image: 'paper-dibond.jpg',
              sizes: [50, 85, 200, null]
            }
          ]
        },
        {
          title: 'Satin',
          description: 'Moab Exhibition Luster now with a gloss optimizer coating. This high quality 11 mil 300g paper answers artist’s and photographers’ requests for a high quality paper between a matte and a gloss, with excellent ink retention characteristics and a color gamut that is second to none. This paper maintains a traditional E surface finish, providing an elegant texture consistent to that of a traditional dark room print. Tip: This is our most popular paper with professional photographers however it also makes stunning art reproductions.',
          image: 'paper-satin.jpg',
          styles: [
            {
              title: 'Borderless',
              description: 'The image will go to the edge of the print. In order to accomplish borderless printing the image will be enlarged approximately by 1/10 to 1/8 of an inch to give the appropriate amount of bleed necessary for cutting.',
              image: 'paper-borderless.jpg',
              sizes: [15, 40, 90, 250]
            },
            {
              title: 'Dibond',
              description: 'Flush mounted (borderless) on Dibond®, a rigid, durable aluminum composite material combines two thin layers of aluminum with a solid polyethylene core.',
              image: 'paper-dibond.jpg',
              sizes: [70, 75, 180, null]
            }
          ]
        },
        {
          title: 'Eco Hemp',
          description: 'Hahnemühle Hemp uses one of the oldest and most diverse natural fibers in the world and is made of 60% hemp fiber. This giclee paper’s base impresses with its bright white natural tone, and thanks to the bright white color of the hemp fibers, no optical brighteners are required. The lightly textured surface gives the paper a pleasant, silky feel. Combined with a premium matte surface, this is a truly versatile paper for your photos and fine art reproductions. Colors and details are brilliantly reproduced, the depth of the black truly stands out and contrasts are reproduced with stunning effect. The acid- and lignin-free paper meets the most exacting requirements for age resistance. Hemp was an essential part of paper production for centuries, and due to its extremely robust fibers, it has often been used for long-lasting historical documents, such as the Gutenberg Bible and the US Declaration of Independence.',
          image: 'paper-satin.jpg',
          styles: [
            {
              title: 'Borderless',
              description: 'The image will go to the edge of the print. In order to accomplish borderless printing the image will be enlarged approximately by 1/10 to 1/8 of an inch to give the appropriate amount of bleed necessary for cutting.',
              image: 'paper-borderless.jpg',
              sizes: [25, 65, 130, 350]
            },
            {
              title: 'Dibond',
              description: 'Flush mounted (borderless) on Dibond®, a rigid, durable aluminum composite material combines two thin layers of aluminum with a solid polyethylene core.',
              image: 'paper-dibond',
              sizes: [60, 105, 230, null]
            }
          ]
        }
      ],
      frames: [
        {
          title: "None",
          description: 'No additional frame',
          action: 'transparent',
          sizes: [[0, 0, 0, 0]]
        },
        {
          title: "Wood White",
          description: 'Alto White 1-15/16"',
          image: 'frame-white.jpg',
          action: 'white',
          sizes: [[35, 90, 250, 680]]
        },
        {
          title: "Wood Black",
          description: 'Alto Black 1-15/16"',
          image: 'frame-black.jpg',
          action: 'black',
          sizes: [[35, 90, 250, 680]]
        }
      ],
      glass: [
        {
          title: "Clear",
          sizes: [[0, 0, 0, 0]]
        },
        {
          title: "R Control",
          sizes: [[20, 30, 60, 150]]
        }
      ]
    },
    {
      title: 'Canvas',
      description: 'High quality canvas prints, with multiple canvas surface options and mounting styles. When stretched & mounted, canvas prints are ultimate ready to hang wall décor for your art or photography.',
      image: 'canvas-matte.jpg',
      panorama: true,
      finishes: [
        {
          title: 'Matte',
          description: 'Archival certified, The Lyve™ Matte Canvas is a 19 mil bright white, consistent poly-cotton blend matte canvas using an acid-free, neutral pH coating. This award-winning Lyve™ Canvas is taking the printmaking industry by storm. With eye-popping color gamut and Dmax, coupled with critical archival certification and the ability to apply a laminate hassle-free, it sets a new standard of exceptionalism in fine art and photographic printmaking. Internally, we refer to this masterful blend of artistry and engineering as "the game changer" that will capture every nuance in your images.',
          image: 'canvas-matte.jpg',
          styles: [
            {
              title: 'Thin stretched',
              description: 'The canvas print will be mounted over 3/4 inch thick (depth) stretcher bars. These prints are meant to be inserted into a frame. You can also choose to have the sides a different color than plain white.',
              image: 'canvas-thin-stretched.jpg',
              sizes: [40, 110, 190, null]
            },
            {
              title: 'Thin gallery wrap',
              description: 'The canvas print will be mounted over .75 inch thick (depth) stretcher bars and the image will wrap on the sides with a fraction of an inch around the back. These are usually hung without a frame. Great option for smaller prints given as gifts and mementos.',
              image: 'canvas-thin-gallery-wrap.jpg',
              sizes: [40, 110, 190, null]
            },
            {
              title: 'Thick stretched',
              description: 'The canvas print will be mounted over 1.5 inch thick (depth) stretcher bars. These prints are meant to be hung unframed or inserted into a canvas floater frame. You can choose to have the sides of the mounted canvas be a solid color other than plain white',
              image: 'canvas-thick-stretched.jpg',
              sizes: [47, 125, 220, 450]
            },
            {
              title: 'Thick gallery wrap',
              description: 'The canvas print will be mounted over 1.5 inch thick (depth) stretcher bars and the image will wrap on the sides with a fraction of an inch around the back. These are usually hung without a frame.',
              image: 'canvas-thick-gallery-wrap.jpg',
              sizes: [47, 125, 220, 450]
            },
          ],
          panoramaStyles: [
            {
              title: 'Stretcher 2"',
              sizes: [60, 125, 295, 340]
            },
            {
              title: 'Stretcher 3"',
              sizes: [null, 175, 390, 430]
            }
          ]
        },
        {
          title: 'Gloss',
          description: 'Crystalline gloss canvas by Breathing Color is a 440gsm aqueous canvas that will deliver industry-leading dmax and color gamut a step above every other glossy or matte inkjet canvas available today. The Crystalline line is OBA free making it one of the most archival gloss canvas available to date.',
          image: 'canvas-gloss.jpg',
          styles: [
            {
              title: 'Thin stretched',
              description: 'The canvas print will be mounted over 3/4 inch thick (depth) stretcher bars. These prints are meant to be inserted into a frame. You can also choose to have the sides a different color than plain white.',
              image: 'canvas-thin-stretched.jpg',
              sizes: [42, 110, 190, null]
            },
            {
              title: 'Thin gallery wrap',
              description: 'The canvas print will be mounted over .75 inch thick (depth) stretcher bars and the image will wrap on the sides with a fraction of an inch around the back. These are usually hung without a frame. Great option for smaller prints given as gifts and mementos.',
              image: 'canvas-thin-gallery-wrap.jpg',
              sizes: [42, 110, 190, null]
            },
            {
              title: 'Thick stretched',
              description: 'The canvas print will be mounted over 1.5 inch thick (depth) stretcher bars. These prints are meant to be hung unframed or inserted into a canvas floater frame. You can choose to have the sides of the mounted canvas be a solid color other than plain white',
              image: 'canvas-thick-stretched.jpg',
              sizes: [55, 125, 220, 450]
            },
            {
              title: 'Thick gallery wrap',
              description: 'The canvas print will be mounted over 1.5 inch thick (depth) stretcher bars and the image will wrap on the sides with a fraction of an inch around the back. These are usually hung without a frame.',
              image: 'canvas-thick-gallery-wrap.jpg',
              sizes: [55, 125, 220, 450]
            },
          ],
          panoramaStyles: [
            {
              title: 'Stretcher 2"',
              sizes: [65, 140, 330, 370]
            },
            {
              title: 'Stretcher 3"',
              sizes: [null, 190, 420, 460]
            }
          ]
        },
        {
          title: 'Silverada',
          description: 'Silverada is a "silver metallic" fine art poly-cotton blend canvas. The metallic finish comes from an optimal blend of metallic, silver, and pearlescent coating applied to the surface of the base canvas. Silverada delivers an extremely high dmax, wide color gamut, and crisp resolution without the use of optical brighteners, therefore making this canvas highly archival. Metallic finished canvas is also greatly favored by photograhers working in black and white as well as HDR photography. Artists looking for more of a metallic sheen in their tones will also find this canvas suited to give their art that additional contrast and pop which would be hard to produce on other surfaces.',
          image: 'canvas-silverada.jpg',
          styles: [
            {
              title: 'Thin stretched',
              description: 'The canvas print will be mounted over 3/4 inch thick (depth) stretcher bars. These prints are meant to be inserted into a frame. You can also choose to have the sides a different color than plain white.',
              image: 'canvas-thin-stretched.jpg',
              sizes: [39, 100, 180, null]
            },
            {
              title: 'Thin gallery wrap',
              description: 'The canvas print will be mounted over .75 inch thick (depth) stretcher bars and the image will wrap on the sides with a fraction of an inch around the back. These are usually hung without a frame. Great option for smaller prints given as gifts and mementos.',
              image: 'canvas-thin-gallery-wrap.jpg',
              sizes: [39, 100, 180, null]
            },
            {
              title: 'Thick stretched',
              description: 'The canvas print will be mounted over 1.5 inch thick (depth) stretcher bars. These prints are meant to be hung unframed or inserted into a canvas floater frame. You can choose to have the sides of the mounted canvas be a solid color other than plain white',
              image: 'canvas-thick-stretched.jpg',
              sizes: [45, 110, 200, 460]
            },
            {
              title: 'Thick gallery wrap',
              description: 'The canvas print will be mounted over 1.5 inch thick (depth) stretcher bars and the image will wrap on the sides with a fraction of an inch around the back. These are usually hung without a frame.',
              image: 'canvas-thick-gallery-wrap.jpg',
              sizes: [45, 110, 200, 460]
            },
          ]
        },
        {
          title: 'Artisan',
          description: 'Silverada is a "silver metallic" fine art poly-cotton blend canvas. The metallic finish comes from an optimal blend of metallic, silver, and pearlescent coating applied to the surface of the base canvas. Silverada delivers an extremely high dmax, wide color gamut, and crisp resolution without the use of optical brighteners, therefore making this canvas highly archival. Metallic finished canvas is also greatly favored by photograhers working in black and white as well as HDR photography. Artists looking for more of a metallic sheen in their tones will also find this canvas suited to give their art that additional contrast and pop which would be hard to produce on other surfaces.',
          image: 'canvas-artisan.jpg',
          styles: [
            {
              title: 'Thin stretched',
              description: 'The canvas print will be mounted over 3/4 inch thick (depth) stretcher bars. These prints are meant to be inserted into a frame. You can also choose to have the sides a different color than plain white.',
              image: 'canvas-thin-stretched.jpg',
              sizes: [39, 100, 190, null]
            },
            {
              title: 'Thin gallery wrap',
              description: 'The canvas print will be mounted over .75 inch thick (depth) stretcher bars and the image will wrap on the sides with a fraction of an inch around the back. These are usually hung without a frame. Great option for smaller prints given as gifts and mementos.',
              image: 'canvas-thin-gallery-wrap.jpg',
              sizes: [39, 100, 190, null]
            },
            {
              title: 'Thick stretched',
              description: 'The canvas print will be mounted over 1.5 inch thick (depth) stretcher bars. These prints are meant to be hung unframed or inserted into a canvas floater frame. You can choose to have the sides of the mounted canvas be a solid color other than plain white',
              image: 'canvas-thick-stretched.jpg',
              sizes: [45, 110, 220, 430]
            },
            {
              title: 'Thick gallery wrap',
              description: 'The canvas print will be mounted over 1.5 inch thick (depth) stretcher bars and the image will wrap on the sides with a fraction of an inch around the back. These are usually hung without a frame.',
              image: 'canvas-thick-gallery-wrap.jpg',
              sizes: [45, 110, 220, 430]
            },
          ]
        }
      ]
    },
    {
      title: 'Acrylic',
      description: 'Face mounted acrylics are the standards professionals turn to over other acrylics when it comes to acrylic prints. Your image will be printed on one of our popular photo papers (satin luster or metallic pearl) and face mounted to the back of the ¼” acrylic panels with a polished edge. In addition to the two paper choices you can choose from either a high gloss polished shine (most popular) or a reflection control acrylic. You can also opt to have your acrylic ordered with a dibond backing. Hanging hardware is provided at no additional charge.',
      image: 'acrylic-luster.jpg',
      panorama: true,
      finishes: [
        {
          title: 'HD',
          image: 'acrylic-luster.jpg',
          styles: [
            {
              title: 'Borderless',
              sizes: [80, 220, 420, 1100]
            },
            {
              title: 'Border 2"',
              sizes: [150, 300, 500, 1200]
            },
            {
              title: 'Border 5"',
              sizes: [220, 420, 700, 1450]
            }
          ],
          panoramaStyles: [
            {
              title: 'Borderless',
              sizes: [60, 120, 320, 1200]
            },
            {
              title: 'Border 2"',
              sizes: [150, 300, 500, 1400]
            },
            {
              title: 'Border 5"',
              sizes: [220, 420, 700, 1550]
            }
          ]
        },
        {
          title: 'Matte',
          image: 'acrylic-luster-no-glare.jpg',
          styles: [
            {
              title: 'Borderless',
              sizes: [65, 200, 380, 950]
            },
            {
              title: 'Border 2"',
              sizes: [135, 270, 470, 1100]
            },
            {
              title: 'Border 5"',
              sizes: [195, 395, 650, 1400]
            }
          ],
          panoramaStyles: [
            {
              title: 'Borderless',
              sizes: [65, 200, 380, 950]
            },
            {
              title: 'Border 2"',
              sizes: [135, 270, 470, 1100]
            },
            {
              title: 'Border 5"',
              sizes: [195, 395, 650, 1400]
            }
          ]
        }
      ],
      frames: [
        {
          title: "None",
          description: 'No frame',
          action: 'transparent',
          sizes: [[0, 0, 0, 0]]
        },
        {
          title: "Artbox - Aluminium Silver",
          description: 'Elegant aluminum floater frame. The small gap between the picture and the aluminum frame is simple and effective. It makes the image appear to be floating.',
          image: 'frame-artbox-aluminium-silver.jpg',
          action: 'lightgrey',
          sizes: [[65, 85, 180, 290], [90, 110, 180, 350]]
        },
        {
          title: "Artbox - Aluminium black",
          description: 'Elegant aluminum floater frame. The small gap between the picture and the aluminum frame is simple and effective. It makes the image appear to be floating.',
          image: 'frame-artbox-aluminium-black.jpg',
          action: 'black',
          sizes: [[65, 85, 180, 290], [90, 110, 180, 350]]
        },
        {
          title: "Aluminium Slimline - Silver",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-silver.png',
          action: 'lightgrey',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Aluminium Slimline - Gold",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-gold.png',
          action: '#D4AF37',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Aluminium Slimline - White",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-white.png',
          action: 'white',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Aluminium Slimline - Black",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-black.png',
          action: 'black',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Aluminium Slimline - White Maple",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-white.png',
          action: '#FED821',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Hamburg - Black Oak",
          image: 'frame-hamburg-black.jpg',
          action: '#252321',
          sizes: [[70, 110, 170, 300], [100, 150, 200, 350]]
        },
        {
          title: "Hamburg - Brown Adler",
          image: 'frame-hamburg-brown.jpg',
          action: '#AE8E7F',
          sizes: [[70, 110, 170, 300], [100, 150, 200, 350]]
        },
        {
          title: "Hamburg - Walnut",
          image: 'frame-hamburg-walnut.jpg',
          action: '#5D432C',
          sizes: [[70, 110, 170, 300], [100, 150, 200, 350]]
        }
      ]
    },
    {
      title: 'Metal',
      description: 'Face mounted acrylics are the standards professionals turn to over other acrylics when it comes to acrylic prints. Your image will be printed on one of our popular photo papers (satin luster or metallic pearl) and face mounted to the back of the ¼” acrylic panels with a polished edge. In addition to the two paper choices you can choose from either a high gloss polished shine (most popular) or a reflection control acrylic. You can also opt to have your acrylic ordered with a dibond backing. Hanging hardware is provided at no additional charge.',
      image: 'acrylic-luster.jpg',
      panorama: true,
      finishes: [
        {
          title: 'HD',
          image: 'acrylic-luster.jpg',
          styles: [
            {
              title: 'Borderless',
              sizes: [80, 220, 420, 1100]
            }
          ],
          panoramaStyles: [
            {
              title: 'Borderless',
              sizes: [60, 120, 320, 1200]
            }
          ]
        }
      ],
      frames: [
        {
          title: "None",
          description: 'No frame',
          action: 'transparent',
          sizes: [[0, 0, 0, 0]]
        },
        {
          title: "Artbox - Aluminium Silver",
          description: 'Elegant aluminum floater frame. The small gap between the picture and the aluminum frame is simple and effective. It makes the image appear to be floating.',
          image: 'frame-artbox-aluminium-silver.jpg',
          action: 'lightgrey',
          sizes: [[65, 85, 180, 290], [90, 110, 180, 350]]
        },
        {
          title: "Artbox - Aluminium black",
          description: 'Elegant aluminum floater frame. The small gap between the picture and the aluminum frame is simple and effective. It makes the image appear to be floating.',
          image: 'frame-artbox-aluminium-black.jpg',
          action: 'black',
          sizes: [[65, 85, 180, 290], [90, 110, 180, 350]]
        },
        {
          title: "Aluminium Slimline - Silver",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-silver.png',
          action: 'lightgrey',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Aluminium Slimline - Gold",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-gold.png',
          action: '#D4AF37',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Aluminium Slimline - White",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-white.png',
          action: 'white',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Aluminium Slimline - Black",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-black.png',
          action: 'black',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Aluminium Slimline - White Maple",
          description: 'Our aluminum Slimline Frame is an all-around fantastic finishing touch for any acrylic glass photo print. The frame’s small width and depth bring out the best in your acrylic glass photo prints, without drawing too much attention to the frame itself.',
          image: 'frame-slimline-white.png',
          action: '#FED821',
          sizes: [[20, 35, 45, 60], [50, 80, 100, 150]]
        },
        {
          title: "Hamburg - Black Oak",
          image: 'frame-hamburg-black.jpg',
          action: '#252321',
          sizes: [[70, 110, 170, 300], [100, 150, 200, 350]]
        },
        {
          title: "Hamburg - Brown Adler",
          image: 'frame-hamburg-brown.jpg',
          action: '#AE8E7F',
          sizes: [[70, 110, 170, 300], [100, 150, 200, 350]]
        },
        {
          title: "Hamburg - Walnut",
          image: 'frame-hamburg-walnut.jpg',
          action: '#5D432C',
          sizes: [[70, 110, 170, 300], [100, 150, 200, 350]]
        }
      ]
    }
  ],
  homepage: {
    section1: {
      title: 'Our photographer',
      description: '<p>My name is Peter Falencik and I have been a professional photographer for over 16 years.</p><p>I grew up in Warsaw, Poland. When I was 13 years old, I moved with my family to Berlin, Germany where I spent the rest of my childhood and finished my studies. I decided to move back to Poland when I was already an adult to continue my education and shortly afterwards, start a family.</p></p>Photography was always a big part of my life and I felt very drawn into it. Since a young age I was already developing photos in a small darkroom I made in my bathroom. Taking and developing pictures became very magical to me and so I knew that it would be something I would like to do my whole life. The school choice was not difficult for me. I graduated from “Artistic Photography and Brand Promotion” college in Poland. Afterwards, I got myself involved and successfully dealt with the promotion of large companies, production of industry advertisements and portrait photography. I have received awards at many exhibitions, worked for various magazines and am part of charitable events each year.I have lived in the United States for the past 7 years, where I’m constantly improving my skills in photography. I’ve noticed that my work keeps changing along with my personality. I think that the constant change in my environment showed me how diverse the world is. It made me realize that there are no boundaries in my life as well as my work. I’m open to any type of photography; I’m always looking to capture the most unusual and magical moments. I love trying new things and constantly being challenged, that’s when I feel most fulfilled. I hope that my work will bring you as much joy as it does to me.</p>',
      quote: 'I believe photographs have a power to change the perception of life around you. Through my photography I try to encapsulate real moments and memories, provoking a feeling of true emotion in the viewer. Though this is often challenging, it\'s what makes the profession so magical, and is why it has always been my greatest passion.',
      signature: '/images/signature.png',
      image: ''
    },
    section2: {
      columns: [
        {
          title: 'Limited edition',
          description: 'We are proud to offer exclusive photographs by Peter Falencikwhich will be relaseased in a limited edition. Limited edition means that the photographs will be printed and sold only in a small number of copies, so that each one will be valuable in the future and can start a great collection of a unique artistic work. The LE number is located in the lower right corner of each of the limited series photos.',
          icon: 'icon-limited-edition.png'
        },
        {
          title: 'High Quality Guaranteed',
          description: 'Our products are always printed on the finest quality materials so you can enjoy them for decades. We have one of the largest ranges of paper selections, while using the highest level of archival print technology allowing superior detail and colour.',
          icon: 'icon-hq.png'
        },
        {
          title: 'Certificate of authenticity',
          description: 'It is crucial for us to provide the proper documentation to our clients when they buy our products. The certificate ensures the validity and authenticity of the transaction and photographs we sell. Our goal is to provide only best quality, genuine and authentic artwork.  All of the products we sell will include a COA.',
          icon: 'icon-certificate.png'
        }
      ]
    }
  },
  categories: [
    {
      title: 'Abstract',
      slug: 'abstract'
    },
    {
      title: 'Animals',
      slug: 'animals'
    },
    {
      title: 'Architecture',
      slug: 'architecture'
    },
    {
      title: 'Beach',
      slug: 'beach'
    },
    {
      title: 'Black & White',
      slug: 'black-white'
    },
    {
      title: 'Cars',
      slug: 'cars'
    },
    {
      title: 'City',
      slug: 'city'
    },
    {
      title: 'Coasts',
      slug: 'coasts'
    },
    {
      title: 'Florida',
      slug: 'florida'
    },
    {
      title: 'Food',
      slug: 'food'
    },
    {
      title: 'Forest',
      slug: 'forest'
    },
    {
      title: 'Landscape',
      slug: 'landscape'
    },
    {
      title: 'Mountains',
      slug: 'mountains'
    },
    {
      title: 'Movie',
      slug: 'movie'
    },
    {
      title: 'Nature',
      slug: 'nature'
    },
    {
      title: 'People',
      slug: 'people'
    },
    {
      title: 'Rain',
      slug: 'rain'
    },
    {
      title: 'Recognizable',
      slug: 'recognizable'
    },
    {
      title: 'Retro',
      slug: 'retro'
    },
    {
      title: 'Space',
      slug: 'space'
    },
    {
      title: 'Streets',
      slug: 'streets'
    },
    {
      title: 'Sunrise and sunset',
      slug: 'sunrise-sunset'
    }
  ],
}
