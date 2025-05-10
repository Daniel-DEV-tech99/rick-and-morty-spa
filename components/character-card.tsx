"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
}

interface CharacterCardProps {
  character: Character;
  searchParams: {
    page?: string;
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
  };
}

export function CharacterCard({ character, searchParams }: CharacterCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Animation on mount with staggered effect based on character id
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + (character.id % 20) * 50); // Staggered animation based on character id

    return () => clearTimeout(timer);
  }, [character.id]);

  const handleViewDetails = () => {
    setIsLoading(true);

    // Create URL params to preserve current search state
    const params = new URLSearchParams();

    // Add all current search params
    if (searchParams.page) params.set("from", searchParams.page);
    if (searchParams.name) params.set("name", searchParams.name);
    if (searchParams.status) params.set("status", searchParams.status);
    if (searchParams.species) params.set("species", searchParams.species);
    if (searchParams.gender) params.set("gender", searchParams.gender);

    const query = params.toString();
    const url = query
      ? `/character/${character.id}?${query}`
      : `/character/${character.id}`;

    router.push(url);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusGlow = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "shadow-[0_0_15px_rgba(34,197,94,0.5)]";
      case "dead":
        return "shadow-[0_0_15px_rgba(239,68,68,0.5)]";
      default:
        return "shadow-[0_0_15px_rgba(107,114,128,0.5)]";
    }
  };

  // Show details with a slight delay after hover
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      timer = setTimeout(() => {
        setShowDetails(true);
      }, 150);
    } else {
      setShowDetails(false);
    }

    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <Card
      className={cn(
        "overflow-hidden relative transition-all duration-500 ease-in-out",
        "hover:shadow-xl hover:-translate-y-1",
        "border-2 hover:border-primary/50",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        isHovered && getStatusGlow(character.status),
        isHovered ? "animate-float" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated corner accent */}
      <div
        className={cn(
          "absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 transform rotate-45",
          "transition-all duration-300 ease-in-out",
          isHovered ? "bg-primary/20" : "bg-primary/0"
        )}
      />

      {/* Decorative elements that appear on hover */}
      {isHovered && (
        <>
          <div
            className="absolute top-0 left-0 w-2 h-2 bg-primary rounded-full animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="absolute top-0 left-4 w-1 h-1 bg-primary rounded-full animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="absolute top-2 left-8 w-1.5 h-1.5 bg-primary rounded-full animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          />
        </>
      )}

      <div className="relative h-64 w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Skeleton className="h-full w-full animate-pulse" />
          </div>
        )}
        <Image
          src={character.image || "/placeholder.svg"}
          alt={character.name}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            imageLoaded ? "opacity-100" : "opacity-0",
            isHovered ? "scale-110 filter brightness-110" : "scale-100"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Status indicator with animation */}
        <div
          className={cn(
            "absolute top-3 right-3 px-2 py-1 rounded-full",
            "backdrop-blur-md bg-black/30",
            "transition-all duration-300",
            isHovered
              ? "translate-x-0 opacity-100 animate-slide-in-right"
              : "translate-x-4 opacity-0",
            "flex items-center gap-1.5 z-10"
          )}
        >
          <span
            className={cn(
              "inline-block w-2 h-2 rounded-full animate-pulse",
              getStatusColor(character.status)
            )}
          />
          <span className="text-xs text-white font-medium">
            {character.status}
          </span>
        </div>

        {/* Character ID badge */}
        {isHovered && (
          <div
            className={cn(
              "absolute bottom-3 left-3 px-2 py-1 rounded-full",
              "backdrop-blur-md bg-black/30 text-white",
              "animate-slide-in-left z-10"
            )}
          >
            <span className="text-xs font-medium">#{character.id}</span>
          </div>
        )}
      </div>

      <CardContent
        className={cn(
          "p-4 transition-all duration-300",
          isHovered ? "bg-accent/50" : ""
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <h2
            className={cn(
              "text-xl font-bold truncate transition-all duration-300",
              isHovered ? "text-primary" : ""
            )}
          >
            {character.name}
          </h2>
          <div
            className={cn(
              "flex items-center gap-1.5 transition-all duration-300",
              isHovered ? "opacity-0" : "opacity-100"
            )}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${getStatusColor(
                character.status
              )}`}
            />
            <span className="text-sm text-muted-foreground">
              {character.status}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <p
            className={cn(
              "text-sm transition-all duration-300 ease-in-out",
              isHovered ? "text-foreground" : "text-muted-foreground",
              "transform origin-left",
              showDetails ? "scale-105 translate-x-1" : "scale-100"
            )}
          >
            <span className="font-medium">Species:</span> {character.species}
          </p>
          <p
            className={cn(
              "text-sm truncate transition-all duration-300 ease-in-out",
              isHovered ? "text-foreground" : "text-muted-foreground",
              "transform origin-left",
              showDetails ? "scale-105 translate-x-2" : "scale-100"
            )}
          >
            <span className="font-medium">Location:</span>{" "}
            {character.location.name}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleViewDetails}
          className={cn(
            "w-full transition-all duration-300",
            isHovered ? "bg-primary shadow-lg" : ""
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
              Loading...
            </span>
          ) : (
            <span
              className={cn(
                "flex items-center justify-center gap-1 transition-all duration-300",
                isHovered ? "gap-2" : "gap-1"
              )}
            >
              <span>View Details</span>
              <span
                className={cn(
                  "transition-all duration-300 transform",
                  isHovered ? "translate-x-1" : "translate-x-0"
                )}
              >
                →
              </span>
            </span>
          )}
        </Button>
      </CardFooter>

      {/* Animated border effect on hover */}
      {isHovered && (
        <>
          <div
            className="absolute bottom-0 left-0 h-1 bg-primary animate-slide-in-right"
            style={{ width: "100%", animationDelay: "0.1s" }}
          />
          <div
            className="absolute top-0 right-0 h-1 bg-primary animate-slide-in-left"
            style={{ width: "100%", animationDelay: "0.1s" }}
          />
        </>
      )}
    </Card>
  );
}
