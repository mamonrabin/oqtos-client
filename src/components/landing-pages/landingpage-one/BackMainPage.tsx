import { ChevronRight } from 'lucide-react';
import React from 'react';

const BackMainPage = () => {
    return (
        <div className='pb-12 Container bg-[#f3f8f8]'>
              <div className="flex flex-col items-center justify-between gap-5 rounded-xl border border-primary/10 bg-white p-6 shadow-sm sm:flex-row sm:px-8">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-slate-900">
              আপনার সোনামণির জন্য অর্ডার করতে চান?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              পণ্য সম্পর্কে জানতে বা অর্ডার করতে যোগাযোগ করুন।
            </p>
          </div>

          <a
            href="#order"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/15 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            এখনই অর্ডার করুন
            <ChevronRight size={19} />
          </a>
        </div>
        </div>
    );
};

export default BackMainPage;