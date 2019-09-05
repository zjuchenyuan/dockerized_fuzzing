Command line used to find this crash:

/usr/local/bin/afl-fuzz -t 3000+ -m none -i /work/output/orthrus/.orthrus/jobs/routine/1089995536/afl-in -o /work/output/orthrus/.orthrus/jobs/routine/1089995536/afl-out -S ASAN000 -- /work/output/orthrus/.orthrus/binaries/afl-asan/bin/mp3gain @@

If you can't reproduce a bug outside of afl-fuzz, be sure to set the same
memory limit. The limit used for this fuzzing session was 0 B.

Need a tool to minimize test cases before investigating the crashes or sending
them to a vendor? Check out the afl-tmin that comes with the fuzzer!

Found any cool bugs in open-source tools using afl-fuzz? If yes, please drop
me a mail at <lcamtuf@coredump.cx> once the issues are fixed - I'd love to
add your finds to the gallery at:

  http://lcamtuf.coredump.cx/afl/

Thanks :-)
