import type {
  CsvOptionsType,
  DataTableInst,
  DataTableSlots,
  MainTableRef,
  RowKey
} from './interface'
import { createId } from 'seemly'
import {
  computed,
  type CSSProperties,
  defineComponent,
  h,
  provide,
  ref,
  type SlotsType,
  toRef,
  Transition,
  watchEffect
} from 'vue'
import { NBaseLoading } from '../../_internal'
import {
  useConfig,
  useLocale,
  useRtl,
  useTheme,
  useThemeClass
} from '../../_mixins'
import { createKey, download, resolveSlot, warnOnce } from '../../_utils'
import { NPagination } from '../../pagination'
import { dataTableLight } from '../styles'
import { dataTableInjectionKey, dataTableProps } from './interface'
import MainTable from './MainTable'
import style from './styles/index.cssr'
import { useCheck } from './use-check'
import { useExpand } from './use-expand'
import { useGroupHeader } from './use-group-header'
import { useResizable } from './use-resizable'
import { useScroll } from './use-scroll'
import { useTableData } from './use-table-data'
import { generateCsv } from './utils'

export default defineComponent({
  name: 'DataTable',
  alias: ['AdvancedTable'],
  props: dataTableProps,
  slots: Object as SlotsType<DataTableSlots>,
  setup(props, { slots }) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onPageChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-page-change` is deprecated, please use `on-update:page` instead.'
          )
        }
        if (props.onPageSizeChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-page-size-change` is deprecated, please use `on-update:page-size` instead.'
          )
        }
        if (props.onSorterChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-sorter-change` is deprecated, please use `on-update:sorter` instead.'
          )
        }
        if (props.onFiltersChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-filters-change` is deprecated, please use `on-update:filters` instead.'
          )
        }
        if (props.onCheckedRowKeysChange !== undefined) {
          warnOnce(
            'data-table',
            '`on-checked-row-keys-change` is deprecated, please use `on-update:checked-row-keys` instead.'
          )
        }
      })
    }

    const {
      mergedBorderedRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props)
    const rtlEnabledRef = useRtl('DataTable', mergedRtlRef, mergedClsPrefixRef)
    const mergedBottomBorderedRef = computed(() => {
      const { bottomBordered } = props
      // do not add bottom bordered class if bordered is true
      // since border is displayed on wrapper
      if (mergedBorderedRef.value)
        return false
      if (bottomBordered !== undefined)
        return bottomBordered
      return true
    })
    const themeRef = useTheme(
      'DataTable',
      '-data-table',
      style,
      dataTableLight,
      props,
      mergedClsPrefixRef
    )
    const bodyWidthRef = ref<number | null>(null)
    const mainTableInstRef = ref<MainTableRef | null>(null)
    const { getResizableWidth, clearResizableWidth, doUpdateResizableWidth }
      = useResizable()
    const { rowsRef, colsRef, dataRelatedColsRef, hasEllipsisRef }
      = useGroupHeader(props, getResizableWidth)

    const {
      treeMateRef,
      mergedCurrentPageRef,
      paginatedDataRef,
      rawPaginatedDataRef,
      selectionColumnRef,
      hoverKeyRef,
      mergedPaginationRef,
      mergedFilterStateRef,
      mergedSortStateRef,
      childTriggerColIndexRef,
      doUpdatePage,
      doUpdateFilters,
      onUnstableColumnResize,
      deriveNextSorter,
      filter,
      filters,
      clearFilter,
      clearFilters,
      clearSorter,
      page,
      sort
    } = useTableData(props, { dataRelatedColsRef })

    const downloadCsv = (options?: CsvOptionsType): void => {
      const { fileName = 'data.csv', keepOriginalData = false } = options || {}
      const data = keepOriginalData ? props.data : rawPaginatedDataRef.value
      const csvData = generateCsv(
        props.columns,
        data,
        props.getCsvCell,
        props.getCsvHeader
      )
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' })
      const downloadUrl = URL.createObjectURL(blob)
      download(
        downloadUrl,
        fileName.endsWith('.csv') ? fileName : `${fileName}.csv`
      )
      URL.revokeObjectURL(downloadUrl)
    }

    const {
      doCheckAll,
      doUncheckAll,
      doCheck,
      doUncheck,
      headerCheckboxDisabledRef,
      someRowsCheckedRef,
      allRowsCheckedRef,
      mergedCheckedRowKeySetRef,
      mergedInderminateRowKeySetRef
    } = useCheck(props, {
      selectionColumnRef,
      treeMateRef,
      paginatedDataRef
    })
    const {
      stickyExpandedRowsRef,
      mergedExpandedRowKeysRef,
      renderExpandRef,
      expandableRef,
      doUpdateExpandedRowKeys
    } = useExpand(props, treeMateRef)
    const {
      handleTableBodyScroll,
      handleTableHeaderScroll,
      syncScrollState,
      setHeaderScrollLeft,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      leftFixedColumnsRef,
      rightFixedColumnsRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef
    } = useScroll(props, {
      bodyWidthRef,
      mainTableInstRef,
      mergedCurrentPageRef
    })
    const { localeRef } = useLocale('DataTable')
    const mergedTableLayoutRef = computed(() => {
      // Layout
      // virtual |descrete header | ellpisis => fixed
      //    = virtual | maxHeight | ellpisis => fixed
      if (
        props.virtualScroll
        || props.flexHeight
        || props.maxHeight !== undefined
        || hasEllipsisRef.value
      ) {
        return 'fixed'
      }
      return props.tableLayout
    })
    provide(dataTableInjectionKey, {
      props,
      treeMateRef,
      renderExpandIconRef: toRef(props, 'renderExpandIcon'),
      loadingKeySetRef: ref(new Set<RowKey>()),
      slots,
      indentRef: toRef(props, 'indent'),
      childTriggerColIndexRef,
      bodyWidthRef,
      componentId: createId(),
      hoverKeyRef,
      mergedClsPrefixRef,
      mergedThemeRef: themeRef,
      scrollXRef: computed(() => props.scrollX),
      rowsRef,
      colsRef,
      paginatedDataRef,
      leftActiveFixedColKeyRef,
      leftActiveFixedChildrenColKeysRef,
      rightActiveFixedColKeyRef,
      rightActiveFixedChildrenColKeysRef,
      leftFixedColumnsRef,
      rightFixedColumnsRef,
      fixedColumnLeftMapRef,
      fixedColumnRightMapRef,
      mergedCurrentPageRef,
      someRowsCheckedRef,
      allRowsCheckedRef,
      mergedSortStateRef,
      mergedFilterStateRef,
      loadingRef: toRef(props, 'loading'),
      rowClassNameRef: toRef(props, 'rowClassName'),
      mergedCheckedRowKeySetRef,
      mergedExpandedRowKeysRef,
      mergedInderminateRowKeySetRef,
      localeRef,
      expandableRef,
      stickyExpandedRowsRef,
      rowKeyRef: toRef(props, 'rowKey'),
      renderExpandRef,
      summaryRef: toRef(props, 'summary'),
      virtualScrollRef: toRef(props, 'virtualScroll'),
      virtualScrollXRef: toRef(props, 'virtualScrollX'),
      heightForRowRef: toRef(props, 'heightForRow'),
      minRowHeightRef: toRef(props, 'minRowHeight'),
      virtualScrollHeaderRef: toRef(props, 'virtualScrollHeader'),
      headerHeightRef: toRef(props, 'headerHeight'),
      rowPropsRef: toRef(props, 'rowProps'),
      stripedRef: toRef(props, 'striped'),
      checkOptionsRef: computed(() => {
        const { value: selectionColumn } = selectionColumnRef
        return selectionColumn?.options
      }),
      rawPaginatedDataRef,
      filterMenuCssVarsRef: computed(() => {
        const {
          self: { actionDividerColor, actionPadding, actionButtonMargin }
        } = themeRef.value
        return {
          '--n-action-padding': actionPadding,
          '--n-action-button-margin': actionButtonMargin,
          '--n-action-divider-color': actionDividerColor
        } satisfies CSSProperties
      }),
      onLoadRef: toRef(props, 'onLoad'),
      mergedTableLayoutRef,
      maxHeightRef: toRef(props, 'maxHeight'),
      minHeightRef: toRef(props, 'minHeight'),
      flexHeightRef: toRef(props, 'flexHeight'),
      headerCheckboxDisabledRef,
      paginationBehaviorOnFilterRef: toRef(props, 'paginationBehaviorOnFilter'),
      summaryPlacementRef: toRef(props, 'summaryPlacement'),
      filterIconPopoverPropsRef: toRef(props, 'filterIconPopoverProps'),
      scrollbarPropsRef: toRef(props, 'scrollbarProps'),
      syncScrollState,
      doUpdatePage,
      doUpdateFilters,
      getResizableWidth,
      onUnstableColumnResize,
      clearResizableWidth,
      doUpdateResizableWidth,
      deriveNextSorter,
      doCheck,
      doUncheck,
      doCheckAll,
      doUncheckAll,
      doUpdateExpandedRowKeys,
      handleTableHeaderScroll,
      handleTableBodyScroll,
      setHeaderScrollLeft,
      renderCell: toRef(props, 'renderCell')
    })
    const exposedMethods: DataTableInst = {
      filter,
      filters,
      clearFilters,
      clearSorter,
      page,
      sort,
      clearFilter,
      downloadCsv,
      scrollTo: (arg0: any, arg1?: any) => {
        mainTableInstRef.value?.scrollTo(arg0, arg1)
      }
    }
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderColor,
          tdColorHover,
          tdColorSorting,
          tdColorSortingModal,
          tdColorSortingPopover,
          thColorSorting,
          thColorSortingModal,
          thColorSortingPopover,
          thColor,
          thColorHover,
          tdColor,
          tdTextColor,
          thTextColor,
          thFontWeight,
          thButtonColorHover,
          thIconColor,
          thIconColorActive,
          filterSize,
          borderRadius,
          lineHeight,
          tdColorModal,
          thColorModal,
          borderColorModal,
          thColorHoverModal,
          tdColorHoverModal,
          borderColorPopover,
          thColorPopover,
          tdColorPopover,
          tdColorHoverPopover,
          thColorHoverPopover,
          paginationMargin,
          emptyPadding,
          boxShadowAfter,
          boxShadowBefore,
          sorterSize,
          resizableContainerSize,
          resizableSize,
          loadingColor,
          loadingSize,
          opacityLoading,
          tdColorStriped,
          tdColorStripedModal,
          tdColorStripedPopover,
          [createKey('fontSize', size)]: fontSize,
          [createKey('thPadding', size)]: thPadding,
          [createKey('tdPadding', size)]: tdPadding
        }
      } = themeRef.value
      return {
        '--n-font-size': fontSize,
        '--n-th-padding': thPadding,
        '--n-td-padding': tdPadding,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-line-height': lineHeight,
        '--n-border-color': borderColor,
        '--n-border-color-modal': borderColorModal,
        '--n-border-color-popover': borderColorPopover,
        '--n-th-color': thColor,
        '--n-th-color-hover': thColorHover,
        '--n-th-color-modal': thColorModal,
        '--n-th-color-hover-modal': thColorHoverModal,
        '--n-th-color-popover': thColorPopover,
        '--n-th-color-hover-popover': thColorHoverPopover,
        '--n-td-color': tdColor,
        '--n-td-color-hover': tdColorHover,
        '--n-td-color-modal': tdColorModal,
        '--n-td-color-hover-modal': tdColorHoverModal,
        '--n-td-color-popover': tdColorPopover,
        '--n-td-color-hover-popover': tdColorHoverPopover,
        '--n-th-text-color': thTextColor,
        '--n-td-text-color': tdTextColor,
        '--n-th-font-weight': thFontWeight,
        '--n-th-button-color-hover': thButtonColorHover,
        '--n-th-icon-color': thIconColor,
        '--n-th-icon-color-active': thIconColorActive,
        '--n-filter-size': filterSize,
        '--n-pagination-margin': paginationMargin,
        '--n-empty-padding': emptyPadding,
        '--n-box-shadow-before': boxShadowBefore,
        '--n-box-shadow-after': boxShadowAfter,
        '--n-sorter-size': sorterSize,
        '--n-resizable-container-size': resizableContainerSize,
        '--n-resizable-size': resizableSize,
        '--n-loading-size': loadingSize,
        '--n-loading-color': loadingColor,
        '--n-opacity-loading': opacityLoading,
        '--n-td-color-striped': tdColorStriped,
        '--n-td-color-striped-modal': tdColorStripedModal,
        '--n-td-color-striped-popover': tdColorStripedPopover,
        '--n-td-color-sorting': tdColorSorting,
        '--n-td-color-sorting-modal': tdColorSortingModal,
        '--n-td-color-sorting-popover': tdColorSortingPopover,
        '--n-th-color-sorting': thColorSorting,
        '--n-th-color-sorting-modal': thColorSortingModal,
        '--n-th-color-sorting-popover': thColorSortingPopover
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'data-table',
          computed(() => props.size[0]),
          cssVarsRef,
          props
        )
      : undefined
    const mergedShowPaginationRef = computed(() => {
      if (!props.pagination)
        return false
      if (props.paginateSinglePage)
        return true
      const mergedPagination = mergedPaginationRef.value
      const { pageCount } = mergedPagination
      if (pageCount !== undefined)
        return pageCount > 1
      return (
        mergedPagination.itemCount
        && mergedPagination.pageSize
        && mergedPagination.itemCount > mergedPagination.pageSize
      )
    })
    return {
      mainTableInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      mergedTheme: themeRef,
      paginatedData: paginatedDataRef,
      mergedBordered: mergedBorderedRef,
      mergedBottomBordered: mergedBottomBorderedRef,
      mergedPagination: mergedPaginationRef,
      mergedShowPagination: mergedShowPaginationRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      ...exposedMethods
    }
  },
  render() {
    const { mergedClsPrefix, themeClass, onRender, $slots, spinProps } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-data-table`,
          this.rtlEnabled && `${mergedClsPrefix}-data-table--rtl`,
          themeClass,
          {
            [`${mergedClsPrefix}-data-table--bordered`]: this.mergedBordered,
            [`${mergedClsPrefix}-data-table--bottom-bordered`]:
              this.mergedBottomBordered,
            [`${mergedClsPrefix}-data-table--single-line`]: this.singleLine,
            [`${mergedClsPrefix}-data-table--single-column`]: this.singleColumn,
            [`${mergedClsPrefix}-data-table--loading`]: this.loading,
            [`${mergedClsPrefix}-data-table--flex-height`]: this.flexHeight
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-data-table-wrapper`}>
          <MainTable ref="mainTableInstRef" />
        </div>
        {this.mergedShowPagination ? (
          <div class={`${mergedClsPrefix}-data-table__pagination`}>
            <NPagination
              theme={this.mergedTheme.peers.Pagination}
              themeOverrides={this.mergedTheme.peerOverrides.Pagination}
              disabled={this.loading}
              {...this.mergedPagination}
            />
          </div>
        ) : null}
        <Transition name="fade-in-scale-up-transition">
          {{
            default: () => {
              return this.loading ? (
                <div class={`${mergedClsPrefix}-data-table-loading-wrapper`}>
                  {resolveSlot($slots.loading, () => [
                    <NBaseLoading
                      clsPrefix={mergedClsPrefix}
                      strokeWidth={20}
                      {...spinProps}
                    />
                  ])}
                </div>
              ) : null
            }
          }}
        </Transition>
      </div>
    )
  }
})
