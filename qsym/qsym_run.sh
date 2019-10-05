#!/bin/bash

die(){
    echo $1;
    exit 1;
}

[ -z "$SEED" ] && die "SEED param not set"
[ -z "$OUTPUT" ] && die "OUTPUT param not set"
[ -z "$PROG" ] && die "PROG param not set"
[ -z "$PROG_NORMAL" ] && die "PROG_NORMAL param not set"
[ -z "$CMD" ] && die "CMD param not set"

/d/afl/afl-2.52b/afl-fuzz -t 1000+ -m none -M afl-master -i ${SEED} -o $OUTPUT -- $PROG $CMD &
sleep 30
/d/afl/afl-2.52b/afl-fuzz -t 1000+ -m none -S afl-slave -i ${SEED} -o $OUTPUT -- $PROG $CMD &
sleep 30
while [ ! -f $OUTPUT/afl-slave/fuzzer_stats ]
do
        sleep 2
        echo "no fuzzer_stats sleep 2"
done
/workdir/qsym/bin/run_qsym_afl.py -a afl-slave -o $OUTPUT -n qsym -- $PROG_NORMAL $CMD &
sleep infinity
