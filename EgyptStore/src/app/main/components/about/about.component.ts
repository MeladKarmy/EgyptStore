import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  constructor() { }
  ImgAbout: string = "../../../../assets/images/dress-shirt-img.png";
  titleAbout: string = "The Heart of Our Business : Passion for Technology and Customer Satisfaction"
  textTitleAbout: string = "Welcome to our website where you can find the latest and greatest in mobile phones, laptops, and other gadgets."
  advantge =
    {
      icon: [
        { icon: "fa-regular fa-circle-check", text: "Our selection includes top-of-the-line brands and models." },
        { icon: "fa-regular fa-circle-check", text: "provide our customers with the best products and services." },
        { icon: "fa-regular fa-circle-check", text: "the best deals and quality products." },
      ]
    }
  description: string = "find the latest and greatest in mobile phones, laptops, and other gadgets.Our selection includes top-of-the-line brands and models,with features that are sure to impress. Whether you're looking for a powerful laptop for work or a sleek smartphone for everyday use.Our mission is to provide our customers with the best products and services, so you can shop with confidence."
  sectionTwo: string = "Services"
  textSectionTwo: string = "Our team of experts has years of experience in the technology industry and is dedicated to helping our customers achieve their goals. Whether you're a small business owner or an individual looking to upgrade your devices, we have the knowledge and expertise to help you find the right solution. Contact us today to learn more about our services and how we can help you."
  advantgeSectionTwo =
    {
      advantge:
        [
          { icon: "fa-brands fa-readme", text: "Expert advice", desc: "We have a team of knowledgeable experts who can help you make informed decisions about which technology products and services are right for you." },
          { icon: "fa-solid fa-screwdriver-wrench", text: "Maintenance", desc: "Voluptatum deleniti atque corrupti quos" },
          { icon: "fa-solid fa-star", text: "High-quality", desc: "We offer only the best quality technology products that are tested for durability, performance, and reliability." },
          { icon: "fa-solid fa-people-group", text: "Trustworthy", desc: "Our team is committed to providing excellent service and support to ensure your satisfaction with our products and services." },
          { icon: "fa-solid fa-sack-dollar", text: "Competitive prices", desc: "We offer competitive pricing on all our products and services, providing you with the best value for your money." },
          { icon: "fa-solid fa-globe", text: "Stay up-to-date ", desc: "We stay up-to-date with the latest advancements in technology and offer the newest and most innovative products available on the market." },
        ]
    }
  question = {
    qestion:
      [
        { q: "What payment methods do you accept?", Answer: "We accept a variety of payment methods, including credit cards, debit cards, PayPal, and more. You can find a full list of accepted payment methods during the checkout process." },
        { q: "How long will it take for my order to arrive?", Answer: "Shipping times will vary depending on your location and the shipping method you choose during checkout. We typically process orders within 1-2 business days, and shipping times can range from 2-7 business days depending on your location." },
        { q: "Can I return or exchange my order if I'm not satisfied?", Answer: "Yes, we offer a hassle-free return and exchange policy. If you're not satisfied with your purchase, simply contact us within 2 days of receiving your order to initiate a return or exchange." },
        { q: "Do you offer international shipping?", Answer: "Yes, we offer international shipping to select countries. Shipping times and costs will vary depending on your location." },
        { q: "How can I track my order?", Answer: " Once your order has been shipped, you will receive a tracking number via email or text message. You can use this tracking number to check the status of your order and estimated delivery date." },
        { q: "Do you offer discounts or promotions?", Answer: "Yes, we offer regular discounts and promotions to our customers. Be sure to sign up for our newsletter or follow us on social media to stay up-to-date on the latest deals and promotions." },
        { q: "Can I cancel my order?", Answer: "If your order has not yet been shipped, you may be able to cancel your order. Please contact us as soon as possible to initiate a cancellation. If your order has already been shipped, you will need to follow our return and exchange policy." }
      ]
  }
}
