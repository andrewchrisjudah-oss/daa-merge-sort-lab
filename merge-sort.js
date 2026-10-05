/* Original event-driven Merge Sort implementation. Also usable from Node.js. */
(function (root) {
  'use strict';
  function simulate(values) {
    const array = values.map((value, origin) => ({ value, origin }));
    const events = [], nodes = []; let comparisons = 0, writes = 0;
    function emit(kind, message, id, extra = {}) {
      events.push({ kind, message, id, comparisons, writes,
        array: array.map(x => ({ ...x })),
        nodes: nodes.map(n => ({ ...n, items: n.items.map(x => ({ ...x })) })), ...extra });
    }
    function sort(lo, hi, depth, parent = null) {
      const id = nodes.length;
      nodes.push({ id, lo, hi, depth, parent, state: 'pending', items: array.slice(lo, hi) });
      if (parent === null) emit('initial', 'Start with the unsorted array. Merge Sort divides the problem into smaller subproblems.', id);
      if (hi - lo <= 1) {
        nodes[id].state = 'sorted';
        emit('base', `Range [${lo}, ${hi}) contains one element, so it is already sorted.`, id);
        return array.slice(lo, hi);
      }
      const mid = lo + Math.floor((hi - lo) / 2);
      nodes[id].state = 'split';
      emit('split', `Split range [${lo}, ${hi}) at index ${mid}: left [${lo}, ${mid}), right [${mid}, ${hi}). Recursively sort the left half, then the right half.`, id);
      const left = sort(lo, mid, depth + 1, id), right = sort(mid, hi, depth + 1, id);
      const merged = []; let i = 0, j = 0;
      nodes[id].state = 'merging';
      emit('merge', 'Both halves are sorted. Compare their first remaining elements and build a sorted temporary buffer.', id, { left, right, i, j, buffer: [] });
      while (i < left.length && j < right.length) {
        comparisons++;
        emit('compare', `Compare ${left[i].value} with ${right[j].value}. ${left[i].value <= right[j].value ? 'Choose the left element (also on a tie, preserving stability).' : 'Choose the right element.'}`, id, { left, right, i, j, buffer: merged.slice() });
        const chosen = left[i].value <= right[j].value ? left[i++] : right[j++];
        merged.push(chosen);
        emit('take', `Append ${chosen.value} to the temporary buffer.`, id, { left, right, i, j, buffer: merged.slice(), chosen: chosen.origin });
      }
      while (i < left.length || j < right.length) {
        const chosen = i < left.length ? left[i++] : right[j++];
        merged.push(chosen);
        emit('remainder', `One half is exhausted. Append remaining element ${chosen.value}; no comparison is needed.`, id, { left, right, i, j, buffer: merged.slice(), chosen: chosen.origin });
      }
      merged.forEach((item, k) => { array[lo + k] = item; writes++; });
      nodes[id].items = merged.slice(); nodes[id].state = 'sorted';
      emit('merged', `Copy the buffer back to indices ${lo}–${hi - 1}. This portion is now sorted.`, id, { left, right, i, j, buffer: merged.slice() });
      return merged;
    }
    if (!values.length) throw new Error('At least one element is required.');
    sort(0, array.length, 0);
    emit('done', 'The entire array is sorted. Each merge combined sorted halves while preserving the original order of equal values.', 0);
    return events;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { simulate };
  root.MergeSort = { simulate };
})(typeof window === 'undefined' ? globalThis : window);
