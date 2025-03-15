"use client";
// import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className=' flex h-16 items-center justify-center w-full px-12'>
        <div className='mr-4 flex items-center md:mr-6'>
          <Link href='/' className='flex items-center space-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-6 w-6'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5z' />
              <path d='M2 17l10 5 10-5' />
              <path d='M2 12l10 5 10-5' />
            </svg>
            <span className='hidden font-bold sm:inline-block'>Dew Play</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  {products.map((product) => (
                    <ListItem key={product.title} title={product.title} href={product.href}>
                      {product.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  {services.map((service) => (
                    <ListItem key={service.title} title={service.title} href={service.href}>
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  {resources.map((resource) => (
                    <ListItem key={resource.title} title={resource.title} href={resource.href}>
                      {resource.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon' className='md:hidden'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <Link href='/' className='flex items-center space-x-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-6 w-6'
              >
                <path d='M12 2L2 7l10 5 10-5-10-5z' />
                <path d='M2 17l10 5 10-5' />
                <path d='M2 12l10 5 10-5' />
              </svg>
              <span className='font-bold'>Brand Name</span>
            </Link>
          </SheetContent>
        </Sheet>

        <div className='ml-auto flex items-center space-x-4'>
          {!isSignedIn ? (
            <SignInButton>
              <Button>Get Started</Button>
            </SignInButton>
          ) : (
            <UserButton
              afterSignOutUrl='/'
              appearance={{
                elements: {
                  userButtonAvatarBox: "size-6",
                },
              }}
            />
          )}
          {/* <Button>Get Started</Button> */}
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  className = "",
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

// Sample data
const products = [
  {
    title: "Product One",
    href: "#",
    description: "A comprehensive solution for your business needs.",
  },
  {
    title: "Product Two",
    href: "#",
    description: "Advanced features to boost your productivity.",
  },
  {
    title: "Product Three",
    href: "#",
    description: "Streamline your workflow with our intuitive tools.",
  },
  {
    title: "Product Four",
    href: "#",
    description: "Enterprise-grade security and performance.",
  },
];

const services = [
  {
    title: "Consulting",
    href: "#",
    description: "Expert advice to help you make the right decisions.",
  },
  {
    title: "Implementation",
    href: "#",
    description: "Seamless integration with your existing systems.",
  },
  {
    title: "Support",
    href: "#",
    description: "24/7 assistance to keep your business running smoothly.",
  },
  {
    title: "Training",
    href: "#",
    description: "Comprehensive training programs for your team.",
  },
];

const resources = [
  {
    title: "Documentation",
    href: "#",
    description: "Detailed guides and API references.",
  },
  {
    title: "Blog",
    href: "#",
    description: "Latest news, tips, and best practices.",
  },
  {
    title: "Community",
    href: "#",
    description: "Connect with other users and share experiences.",
  },
  {
    title: "Webinars",
    href: "#",
    description: "Live and recorded sessions on various topics.",
  },
];
