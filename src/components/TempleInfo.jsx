function TempleInfo({temple}) {
  return (
    <>
      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-medium text-[#3B0066]">เกี่ยวกับวัด</h2>
        <p className="mt-5 whitespace-pre-line text-base leading-8">
          {temple.description}
        </p>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-medium text-[#3B0066]">
          ความเชื่อและสิริมงคล
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {temple.categories?.map((item) => (
            <span
              key={item.id}
              className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#efe2f2] px-5 py-2 text-center text-sm font-medium text-[#40204f]"
            >
              {item.name}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

export default TempleInfo;
