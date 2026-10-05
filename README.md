# Merge Sort Lab — DAA prototype

## Run
Extract the ZIP into a folder, then double-click `index.html` to open it in a modern browser. Keep `index.html`, `merge-sort.js`, and `ui.js` together. No installation, server, or internet connection is required.

## Demonstration
1. Load the default array: `38, 27, 43, 3, 9, 82, 10`.
2. Click **Next** to show the initial split. Continue to see recursive subdivisions and one-element base cases in the recursion tree.
3. During a comparison, inspect the left and right halves. The outlined candidates are compared; the next step appends the chosen element to the temporary buffer.
4. Watch remainder elements move into the buffer, then see the merged portion copied into the current array.
5. Continue until the final array is `3, 9, 10, 27, 38, 43, 82`.
6. Use **Previous**, the step slider, **Restart**, or **Play/Pause** to explore the execution. Adjust the playback duration as needed.
7. Load `5, 2, 5, 1, 2` to demonstrate stability. The small `#` labels are zero-based original positions; equal values retain their original order.

## Assignment coverage
- Topic: Merge Sort, a divide-and-conquer algorithm from DAA.
- Language: JavaScript, with an HTML/CSS interface.
- Demonstrates input, splitting, recursive subdivision, comparisons, merging, and final sorted output.
- Interactive playback, forward/backward navigation, custom inputs, random inputs, and step explanations.
- Includes a recursion tree, temporary merge buffer, pseudocode highlighting, and operation counters.
- Handles negatives, duplicates, sorted input, reverse order, and single-element input.
- Original implementation; no VisuAlgo code or assets are copied. VisuAlgo is an optional conceptual visualization reference, not a dependency.

## Design and analysis
`merge-sort.js` generates immutable execution snapshots from recursive Merge Sort. `ui.js` renders those snapshots and manages playback. Advancing the interface reveals actual algorithm events, rather than merely showing a sorted result. Backward navigation restores earlier snapshots.

Each merge takes linear time in its range length. There are logarithmically many recursion levels, giving O(n log n) sorting time. Temporary sorting storage is O(n), with an O(log n) recursion stack. The simulator additionally stores execution history for teaching and navigation; its memory use is higher than the underlying algorithm. Input is limited to 16 elements to keep that history and the visual tree manageable.

Comparisons count value comparisons, and array writes count elements copied back after each completed merge. Buffer appends are shown but are not included in array writes. Ties select from the left half, preserving stability.

## Validation
Tested against 107 inputs, including randomized arrays and edge cases, with checks for sorted output, stability, and preserved initial snapshots. Browser checks cover navigation, seeking, playback, restart, random input, invalid input, completion, and layout at desktop and 360-pixel widths.
