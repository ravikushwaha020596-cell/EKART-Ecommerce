import { Headphones, Shield, Truck } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section className="py-10 md:py-12 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Feature 1 */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <Truck className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold">
                Free shipping
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Free delivery on orders above ₹500
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold">
                Secure Payment
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                100% Secure transaction
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
              <Headphones className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold">
                24/7 Support
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Always here to help
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
