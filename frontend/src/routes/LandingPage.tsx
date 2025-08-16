import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { Code2, Smartphone, BarChart3 } from "lucide-react";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Data
const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive web applications built with the latest technologies",
    icon: <Code2 size={32} />,
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android",
    icon: <Smartphone size={32} />,
  },
  {
    title: "Digital Marketing",
    description:
      "Strategic digital marketing solutions to grow your online presence",
    icon: <BarChart3 size={32} />,
  },
];

const features = [
  {
    title: "Agile Development",
    description:
      "Flexible and iterative development process with regular updates",
    icon: "⚡",
  },
  {
    title: "Scalable Solutions",
    description: "Build systems that grow with your business needs",
    icon: "📈",
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock technical support and maintenance",
    icon: "🔧",
  },
  {
    title: "Security First",
    description: "Enterprise-grade security measures and best practices",
    icon: "🔒",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <Section className="flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 to-background">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 pt-16"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="flex-1 text-center lg:text-left" variants={slideInLeft}>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Building the Future of
              <motion.span
                className="text-primary block mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Digital Solutions
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Transform your ideas into reality with our cutting-edge development solutions.
              We bring innovation to life.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={() => navigate("/signup")}>
                  Get Started
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div className="flex-1" variants={slideInRight}>
            <motion.div
              className="relative w-full max-w-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src="/devs.png"
                alt="Modern workspace with developers working on multiple screens showing code and design interfaces"
                className="rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* Services Section */}
      <Section className="bg-muted/50">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your needs
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              whileHover="hover"
              animate="rest"
              variants={{
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                hover: { scale: 1.05, y: -5 },
                rest: { scale: 1 }
              }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300">
                <motion.div 
                  className="w-16 h-16 mb-4 text-primary flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {service.icon}
                </motion.div>
                <motion.h3 
                  className="text-2xl font-semibold mb-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {service.description}
                </motion.p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Features Section */}
      <Section>
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn}>
            <img
              src="/dashboard.png"
              alt="Dashboard interface showing various analytics and project management features"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Feature Highlights</h2>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div 
                    className="flex-none"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(var(--primary), 0.2)",
                          "0 0 0 10px rgba(var(--primary), 0)",
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-xl font-semibold mb-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.2 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section
        fullHeight={false}
        className="bg-gradient-to-br from-primary to-primary-dark text-white"
      >
        <motion.div
          className="text-center max-w-3xl mx-auto py-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us today and transform your digital presence with our cutting-edge solutions
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/signup")}>
            Get Started Now
          </Button>
        </motion.div>
      </Section>
    </div>
  );
}
