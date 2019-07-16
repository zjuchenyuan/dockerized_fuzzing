#!/bin/bash
PROG="/work/build/mp3gain/afl/aflasan/mp3gain"
PROG_NORMAL="/work/build/mp3gain/normal/mp3gain"
SEED="/work/seed/mp3"
OUTPUT="/work/output/qsym"
CMD="@@"

/afl/afl-fuzz -t 1000+ -m none -M afl-master -i $SEED -o $OUTPUT -- $PROG $CMD &
sleep 30
/afl/afl-fuzz -t 1000+ -m none -S afl-slave -i $SEED -o $OUTPUT -- $PROG $CMD &
sleep 30
while [ ! -f $OUTPUT/afl-slave/fuzzer_stats ]
do
	sleep 2
	echo "no fuzzer_stats sleep 2"
done
/workdir/qsym/bin/run_qsym_afl.py -a afl-slave -o $OUTPUT -n qsym -- $PROG_NORMAL $CMD &
sleep infinity
